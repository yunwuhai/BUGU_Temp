<!-- 项目界面 -->
<template>
  <div class=''>
    <a-button @click="createProject"
              style="margin-top:10px;margin-bottom:20px;">新建项目</a-button>
    <Init></Init>
    <a-table :columns="columns"
             :data-source="tableData"
             :scroll="{y:250}"
             :loading="$store.getters.loading">
      <a slot="name"
         slot-scope="text,record"
         @click="open(record.id)">{{ text }}</a>
      <span slot="chipId"
            slot-scope="text">{{ findChipName(text) }}</span>
      <template slot="operation"
                slot-scope="text, record">
        <div class="editable-row-operations">
          <a @click="()=> edit(record)">编辑</a>
          <a-popconfirm title="确定删除吗？"
                        @confirm="() => del(record.id)">
            <a>删除</a>
          </a-popconfirm>
        </div>
      </template>
    </a-table>

    <a-list class="comment-list"
            :header="`${data.length} 评论`"
            item-layout="horizontal"
            :data-source="data">
      <a-list-item slot="renderItem"
                   slot-scope="item">
        <a-comment :author="item.author"
                   :avatar="item.avatar">
          <template slot="actions">
            <span v-for="(action,index) in item.actions"
                  :key="index">{{ action }}</span>
          </template>
          <p slot="content">
            <a-rate :default-value="4"
                    disabled />
            <br>
            {{ item.content }}
          </p>
          <a-tooltip slot="datetime"
                     :title="item.datetime.format('YYYY-MM-DD HH:mm:ss')">
            <span>{{ item.datetime.fromNow() }}</span>
          </a-tooltip>
        </a-comment>
      </a-list-item>
    </a-list>
    <a-modal v-model="visible"
             title="修改项目"
             :closable="true"
             :maskClosable="false"
             @cancel="handleCancel"
             @ok="save('ruleForm')">
      <a-form-model ref="ruleForm"
                    :model="initForm"
                    :rules="rules"
                    v-bind="layout">
        <a-form-model-item has-feedback
                           label="项目名称："
                           prop="name">
          <a-input v-model="initForm.name"
                   :autoFocus="true"
                   ref="name"
                   type="text"
                   allowClear
                   autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item label="项目英文名："
                           prop="token">
          <a-input v-model="initForm.token"
                   ref="token"
                   type="text"
                   allowClear
                   autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item has-feedback
                           label="芯片类型："
                           prop="chip">
          <a-select v-model="initForm.chip"
                    ref="chip"
                    allowClear
                    autocomplete="off">
            <a-select-option v-for="item in chipList"
                             :value="item.name"
                             :key="item.id">
              {{item.name}}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item has-feedback
                           label="堆大小："
                           prop="heap">
          <a-input-number v-model="initForm.heap"
                          :min="1"
                          ref="heap"
                          allowClear
                          type="text"
                          autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item has-feedback
                           label="栈大小："
                           prop="stack">
          <a-input-number v-model="initForm.stack"
                          :min="1"
                          ref="stack"
                          allowClear
                          type="text"
                          autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item has-feedback
                           label="简介："
                           prop="description">
          <a-textarea placeholder="项目简单介绍"
                      v-model="initForm.description"
                      @keyup.enter="save('ruleForm')"
                      allowClear
                      :rows="3" />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import moment from 'moment';
import Init from '@/views/project/Init'

const columns = [
  {
    title: '项目名',
    dataIndex: 'name',
    key: 'name',
    align: "center",
    width: '17%',
    scopedSlots: { customRender: 'name' },
  },
  {
    title: '英语名',
    dataIndex: 'token',
    width: '17%',
    key: 'token',
    align: "center",
  },
  {
    title: '芯片',
    dataIndex: 'chipId',
    width: '15%',
    key: 'chipId',
    align: "center",
    scopedSlots: { customRender: 'chipId' },
  },
  {
    title: '堆大小',
    dataIndex: 'heap',
    width: '10%',
    align: "center",
    key: 'heap',
  },
  {
    title: '栈大小',
    dataIndex: 'stack',
    width: '10%',
    align: "center",
    key: 'stack',
  },
  {
    title: '简介',
    dataIndex: 'description',
    key: 'description',
    width: '20%',
    align: "center",
    ellipsis: true,
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    align: "center",
    ellipsis: true,
    scopedSlots: { customRender: 'operation' },
  },
];

import engineeringApi from '@/api/engineering'
import treeApi from '@/api/tree'
import { getUserInfo, setProjectInfo, getProjectInfo, removeProjectInfo } from '@/utils/token'
import chipApi from '@/api/chip'

export default {
  //import引入的组件需要注入到对象中才能使用
  components: { Init },
  data() {
    //这里存放数据
    return {
      // loading:false,
      chipList: [],
      initForm: {
        id: "",//项目id
        type: "0",
        name: '',
        token: "",
        heap: "",
        stack: '',
        chip: '芯片1',
        description: ""
      },
      rules: {
        type: [{ required: true, message: "请选择项目类型", trigger: 'change' }],
        name: [{ required: true, message: "请输入项目名称", trigger: 'change' }],
        heap: [{ required: true, message: "请输入堆大小", trigger: 'change' }],
        stack: [{ required: true, message: "请输入栈大小", trigger: 'change' }],
        chipId: [{ required: true, message: "请选择芯片类型", trigger: 'change' }],
      },
      layout: {
        labelCol: { span: 7 },
        wrapperCol: { span: 15 },
      },
      visible: false,
      data: [
        {
          actions: ['回复'],
          author: 'HSY',
          avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          content:
            '工程很棒！想借用一下',
          datetime: moment().subtract(1, 'days'),
        },
        {
          actions: ['回复'],
          author: 'Han Solo',
          avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          content:
            'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
          datetime: moment().subtract(2, 'days'),
        },
      ],
      tableData: [],
      columns,
      moment,
    }
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    getChipList() {
      chipApi.queryAll()
        .then((res) => {
          if (res.code === 200) {
            this.chipList = res.data
          }
          else {
            this.chipList = []
          }
        })
    },
    findChipId(name) {
      for (let i = 0; i < this.chipList.length; i++) {
        if (this.chipList[i].name === name) {
          return this.chipList[i].id
        }
      }
    },
    findChipName(id) {
      for (let i = 0; i < this.chipList.length; i++) {
        if (this.chipList[i].id === +id) {
          return this.chipList[i].name
        }
      }
    },
    createProject() {
      this.$store.commit("SET_CREATEVISIBLE", true)
    },
    getAllEngineerings() {
      engineeringApi.queryByUid(getUserInfo().id)
        .then((res) => {
          // console.log(res)
          if (res.code === 200) {
            if (res.data.length) {
              res.data.map((item) => item.key = item.id)
              this.tableData = res.data
            } else {
              this.tableData = []
            }
          } else {
            this.tableData = []
          }
        })
        .catch((err) => {
          console.log(err)
        })

    },
    open(id) {
      this.$store.commit("CLEAR_PANES")
      // console.log(id)
      /* 
        向后端请求系统已有的组件目录树
      */
      treeApi.getTree(1, 0)
        .then((res) => {
          // this.systemTree = res.data
          this.$store.commit('SET_SYSTEMTREE', res.data)
        })
        .catch((err) => {
          this.$message.error("外部组件获取失败", 0.7)
          console.error(err)
        })

      treeApi.getTree(getUserInfo().id, id)
        .then((res) => {
          // this.userTree = res.data
          this.$store.commit('SET_USERTREE', res.data)
        })
        .catch((err) => {
          this.$message.error("内部组件获取失败", 0.7)
          console.error(err)
        })

      engineeringApi.queryById(id)
        .then((res) => {
          if (res.code === 200) {
            this.$message.success(res.msg, 0.5)
            this.$store.commit("SET_PROJECT", res.data)
            sessionStorage.setItem('projectId', res.data.id)
            if (getProjectInfo()) {
              removeProjectInfo()
            }
            setProjectInfo(res.data)
            // sessionStorage.setItem('projectName', res.data.name)
            this.$router.push({ name: 'Project' })
          }
        })
    },
    edit(record) {
      // console.log(record)
      this.visible = true
      let data = {
      }
      Object.assign(data, record)
      data.chip = this.findChipName(data.chipId)
      data.stack = eval(data.stack).toString(10)
      data.heap = eval(data.heap).toString(10)
      delete data.chipId
      // console.log(data)
      this.initForm = data
    },
    save(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.initForm.chipId = this.findChipId(this.initForm.chip)
          this.initForm.stack = "0x" + parseInt(this.initForm.stack).toString(16)
          this.initForm.heap = "0x" + parseInt(this.initForm.heap).toString(16)
          delete this.initForm.chip
          engineeringApi.update(this.initForm)
            .then((res) => {
              this.$message.success(res.msg, 0.5)
              this.visible = false
              this.getAllEngineerings()
            })
        }
      })

    },
    del(id) {
      engineeringApi.del(id)
        .then((res) => {
          this.$message.success(res.msg, 0.5)
          this.getAllEngineerings()
        })

    },
    handleCancel() {
      this.$store.commit("SET_CREATEVISIBLE", false)
      this.visible = false
      this.initForm = {}
      this.$message.info('取消修改', 0.5)
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getAllEngineerings()
    this.getChipList()
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {

  },
  beforeCreate() { }, //生命周期 - 创建之前
  beforeMount() { }, //生命周期 - 挂载之前
  beforeUpdate() { }, //生命周期 - 更新之前
  updated() { }, //生命周期 - 更新之后
  beforeDestroy() { }, //生命周期 - 销毁之前
  destroyed() { }, //生命周期 - 销毁完成
  activated() { }, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>