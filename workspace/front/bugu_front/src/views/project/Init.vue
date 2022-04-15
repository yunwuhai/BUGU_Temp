<!-- 初始化选择 -->
<template>
  <div class=''>
    <a-modal v-model="$store.state.card.createVisible"
             title="新建项目"
             :closable="true"
             :maskClosable="false"
             @cancel="handleCancel"
             @ok="handleOk('ruleForm')">
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
        <a-form-model-item label="项目类型："
                           prop="type">
          <a-radio-group name="type"
                         v-model="initForm.type"
                         ref="type">
            <a-tooltip placement="top"
                       title="仅仅编辑一个组件,不能进行后续编译">
              <a-radio value="1">
                组件
              </a-radio>
            </a-tooltip>
            <a-tooltip placement="top"
                       title="有多个组件,包含main核心组件,可进行后续编译">
              <a-radio value="0">
                工程
              </a-radio>
            </a-tooltip>
          </a-radio-group>
        </a-form-model-item>
        <template v-if="initForm.type==='0'">
          <a-form-model-item has-feedback
                             label="芯片类型："
                             prop="chip">
            <a-select v-model="initForm.chip"
                      ref="chip"
                      allowClear
                      autocomplete="off">
              <a-select-option value="1">
                芯片1
              </a-select-option>
            </a-select>
          </a-form-model-item>

          <a-form-model-item has-feedback
                             label="堆栈大小："
                             prop="stack">
            <a-input-number v-model="initForm.stack"
                            :min="1"
                            ref="stack"
                            allowClear
                            type="text"
                            autocomplete="off" />
          </a-form-model-item>
        </template>
        <template v-else>
          <a-tooltip placement="bottom"
                     title="用户通过抽象组件来实现项目在不同平台间的快速移植,其中不用实现方法">
            <a-form-model-item label="抽象组件："
                               prop="abstract">
              <a-radio-group name="abstract"
                             v-model="initForm.abstract"
                             ref="abstract">
                <a-radio value="1">
                  是
                </a-radio>
                <a-radio value="2">
                  否
                </a-radio>
              </a-radio-group>
            </a-form-model-item>
          </a-tooltip>
        </template>
        <a-form-model-item has-feedback
                           label="简介："
                           prop="description">
          <a-textarea placeholder="项目简单介绍"
                      v-model="initForm.description"
                      @keyup.enter="handleOk('ruleForm')"
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
import { nanoid } from "nanoid"
import engineeringApi from '@/api/engineering'
import componentApi from '@/api/component'
import { getUserInfo } from '@/utils/token'

export default {
  name: "Init",
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      loading: false,
      initForm: {
        id: nanoid(),//项目id
        type: "0",
        name: '',
        token: "",
        stack: '',
        chip: '1',
        abstract: '0',
        description: ""
        // componentId:[] //工程项目中所有组件id的集合
      },
      rules: {
        type: [{ required: true, message: "请选择项目类型", trigger: 'change' }],
        name: [{ required: true, message: "请输入项目名称", trigger: 'change' }],
        stack: [{ required: true, message: "请输入堆栈大小", trigger: 'change' }],
        chip: [{ required: true, message: "请选择芯片类型", trigger: 'change' }],
        abstract: [{ required: true, message: "请选择是否为抽象组件", trigger: 'change' }]
      },
      layout: {
        labelCol: { span: 7 },
        wrapperCol: { span: 15 },
      },
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    nextFocus(name) {
      this.$refs[name].focus()
    },
    handleOk(formName) {
      let req = {}
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 工程项目
          if (this.initForm.type === "0") {
            req.userId = getUserInfo().id
            req.author = getUserInfo().nickName
            req.name = this.initForm.name
            req.token = this.initForm.token ? this.initForm.token : 'engineering'
            req.type = "2"
            req.description = this.initForm.description
            req.chipId = this.initForm.chip
            req.stack = this.initForm.stack
            req.componentsId = ""
            engineeringApi.init(req)
              .then((res) => {
                // console.log("工程", res.data)
                if (res.code === 200) {
                  this.$message.success(res.msg, 0.5)
                  this.$store.commit("SET_PROJECT", res.data)
                  sessionStorage.setItem('projectId', res.data.id)
                  this.$store.commit("SET_CREATEVISIBLE", false)
                  this.$router.push({ name: 'Project' })
                } else {
                  this.$message.error(res.msg, 0.5)
                  console.log(res.msg)
                  this.resetForm('ruleForm')
                }
              })
              .catch(() => {
                this.$message.error('新建失败', 0.5)
                this.resetForm('ruleForm')
              })
          } else {
            req.name = this.initForm.name
            req.token = this.initForm.token ? this.initForm.token : 'component'
            req.userId = getUserInfo().id
            req.author = getUserInfo().nickName
            req.type = this.initForm.abstract
            req.description = this.initForm.description
            componentApi.add(req)
              .then((res) => {
                console.log("组件", res.data)
                if (res.code === 200) {
                  this.$message.success(res.msg, 0.5)
                  this.$store.commit("SET_PROJECT", res.data)
                  this.$store.commit("SET_CREATEVISIBLE", false)
                  this.$router.push({ name: 'Project' })
                } else {
                  this.$message.error(res.msg, 0.5)
                  this.resetForm('ruleForm')
                }
              })
              .catch(() => {
                this.$message.error('新建失败', 0.5)
                this.resetForm('ruleForm')
              })
          }
        } else {
          this.$message.error('新建失败', 0.5)
          return false;
        }
      });
    },
    handleCancel() {
      this.$store.commit("SET_CREATEVISIBLE", false)
      this.$router.push({ path: '/usercenter/projectinfo' })
      this.$message.info('取消新建', 0.5)
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    beforeUnloadHandler(e) {
      e.returnValue = "" // 此处返回任意字符串，不返回null即可，不能修改默认提示内容
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    // this.$store.commit("SET_CREATEVISIBLE", true)
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    //全局事件总线
    this.$bus.$on('clear', this.clearExpand)
    // window.addEventListener("beforeunload", this.beforeUnloadHandler, false)
  },
  destroyed() {
    // window.removeEventListener("beforeunload", this.beforeUnloadHandler, false)
  },
}
</script>
<style scoped>
</style>