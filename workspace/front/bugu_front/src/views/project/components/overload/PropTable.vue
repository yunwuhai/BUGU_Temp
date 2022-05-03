<template>
  <div>
    <a-config-provider>
      <template #renderEmpty>
        <a-empty description="暂无参数" />
        <a-button @click="add(classId)">新建</a-button>
      </template>
      <a-table :columns="columns"
               :data-source="data"
               :scroll="{y:400,x:900}"
               :bordered="false">

        <template v-for="col in ['name', 'token','type','defaultV','description']"
                  :slot="col"
                  slot-scope="text, record">
          <!--  text:该单元格内容
              record:该行的数据
              index:索引      -->

          <div :key="col">
            <template v-if="col === 'type'">
              <a-tag color="blue"
                     v-if="record.varType==='1'">
                常量
              </a-tag>
              <a-tag color="red"
                     v-else-if="record.varType==='0'">
                变量
              </a-tag>

              <a-tag color="green"
                     v-if="record.dataType==='0'">
                整型
              </a-tag>
              <a-tag color="cyan"
                     v-else-if="record.dataType==='1'">
                浮点型
              </a-tag>
              <a-tag color="grey"
                     v-else-if="record.dataType==='2'">
                布尔型
              </a-tag>
              <a-tag color="orange"
                     v-else-if="record.dataType==='3'">
                字符型
              </a-tag>
              <a-tag color="yellow"
                     v-else-if="record.dataType==='4'">
                字符串
              </a-tag>
              <a-tag color="pink"
                     v-else-if="record.dataType==='5'">
                数组
              </a-tag>
            </template>
            <span v-else> {{ text }}</span>
          </div>
        </template>

        <template slot="operation"
                  slot-scope="text, record">
          <div class="editable-dataForm-operations">
            <span>
              <a @click="add(record.classId)">新建</a>
              <a @click="()=> edit(record.id)">编辑</a>
              <a-popconfirm title="确定删除吗？"
                            @confirm="() => del(record.id)">
                <a>删除</a>
              </a-popconfirm>
            </span>
          </div>
        </template>
      </a-table>
    </a-config-provider>
    <!-- 增加 -->
    <a-modal v-model="visible"
             :title="title"
             :closable="true"
             :maskClosable="true"
             @ok="saveAdd('dataForm')"
             @cancel="close">
      <a-form-model ref="dataForm"
                    :model="dataForm"
                    :rules="dataRules"
                    v-bind="layout">
        <a-form-model-item has-feedback
                           label="名称："
                           prop="name">
          <a-input v-model="dataForm.name"
                   :autoFocus="true"
                   ref="name"
                   type="text"
                   allowClear
                   autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item label="英文名："
                           prop="token">
          <a-input v-model="dataForm.token"
                   ref="token"
                   type="text"
                   allowClear
                   autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item label="输入/输出参数："
                           prop="type">
          <a-radio-group name="type"
                         v-model="dataForm.type"
                         :defaultValue="tableType"
                         ref="type">
            <a-radio value="1"
                     :disabled="tableType==='2'">
              输入
            </a-radio>
            <a-radio value="2"
                     :disabled="tableType==='1'">
              输出
            </a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item label="类型："
                           prop="varType">
          <a-radio-group name="varType"
                         v-model="dataForm.varType"
                         ref="varType">
            <a-radio value="0">
              变量
            </a-radio>
            <a-radio value="1">
              常量
            </a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item label="数据类型："
                           prop="dataType">
          <a-select style="width:30%"
                    v-model="dataForm.dataType">
            <a-select-option v-for="item in typeList"
                             :key="item.value"
                             :value="item.value">
              {{item.title}}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="默认值："
                           prop="defaultV">
          <a-input-number v-model="dataForm.defaultV"
                          :precision="0"
                          :formatter="limitNumber"
                          :parser="limitNumber"
                          :min="-2147483648"
                          :max="2147483647"
                          v-if="dataForm.dataType ==='0'" />
          <a-input-number v-model="dataForm.defaultV"
                          :min="-Infinity"
                          :max="Infinity"
                          :step="0.1"
                          v-if="dataForm.dataType ==='1'" />
          <a-switch v-model="dataForm.defaultV"
                    checked-children="'1'"
                    un-checked-children="'0'"
                    default-checked
                    v-if="dataForm.dataType ==='2'" />
          <a-input v-model="dataForm.defaultV"
                   v-if="dataForm.dataType ==='3'"
                   :maxLength="1" />
          <a-input v-model="dataForm.defaultV"
                   v-if="dataForm.dataType ==='4'" />
          <a-tooltip title="输入数组成员，用逗号隔开">
            <a-input v-model="dataForm.defaultV"
                     v-if="dataForm.dataType ==='5'" />
          </a-tooltip>
          <a-input v-model="dataForm.defaultV"
                   :disabled="true"
                   v-if="!dataForm.dataType" />
        </a-form-model-item>
        <a-form-model-item has-feedback
                           label="简介："
                           prop="description">
          <a-textarea placeholder="填写数据介绍"
                      v-model="dataForm.description"
                      @keyup.enter="saveAdd('dataForm')"
                      allowClear
                      :dataForms="3" />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
    <!-- 更新 -->
    <a-modal v-model="visible1"
             :title="title"
             :closable="true"
             :maskClosable="true"
             @ok="saveEdit('dataForm')"
             @cancel="close">
      <a-form-model ref="dataForm"
                    :model="dataForm"
                    :rules="dataRules"
                    v-bind="layout">
        <a-form-model-item has-feedback
                           label="名称："
                           prop="name">
          <a-input v-model="dataForm.name"
                   :autoFocus="true"
                   ref="name"
                   type="text"
                   allowClear
                   autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item label="英文名："
                           prop="token">
          <a-input v-model="dataForm.token"
                   ref="token"
                   type="text"
                   allowClear
                   autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item label="输入/输出参数："
                           prop="type">
          <a-radio-group name="type"
                         v-model="dataForm.type"
                         :defaultValue="tableType"
                         ref="type">
            <a-radio value="1"
                     :disabled="tableType==='2'">
              输入
            </a-radio>
            <a-radio value="2"
                     :disabled="tableType==='1'">
              输出
            </a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item label="数据类型："
                           prop="varType">
          <a-radio-group name="varType"
                         v-model="dataForm.varType"
                         ref="varType">
            <a-radio value="0">
              变量
            </a-radio>
            <a-radio value="1">
              常量
            </a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item label="数据类型："
                           prop="dataType">
          <a-select style="width:30%"
                    v-model="dataForm.dataType">
            <a-select-option v-for="item in typeList"
                             :key="item.value"
                             :value="item.value">
              {{item.title}}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="默认值："
                           prop="defaultV">
          <a-input-number v-model="dataForm.defaultV"
                          :precision="0"
                          :formatter="limitNumber"
                          :parser="limitNumber"
                          :min="-2147483648"
                          :max="2147483647"
                          v-if="dataForm.dataType ==='0'" />
          <a-input-number v-model="dataForm.defaultV"
                          :min="-Infinity"
                          :max="Infinity"
                          :step="0.1"
                          v-if="dataForm.dataType ==='1'" />
          <a-switch v-model="dataForm.defaultV"
                    checked-children="true"
                    un-checked-children="false"
                    default-checked
                    v-if="dataForm.dataType ==='2'" />
          <a-input v-model="dataForm.defaultV"
                   v-if="dataForm.dataType ==='3'"
                   :maxLength="1" />
          <a-input v-model="dataForm.defaultV"
                   v-if="dataForm.dataType ==='4'" />
          <a-tooltip title="输入数组成员，用逗号隔开">
            <a-input v-model="dataForm.defaultV"
                     v-if="dataForm.dataType ==='5'" />
          </a-tooltip>
          <a-input v-model="dataForm.defaultV"
                   v-if="dataForm.dataType ===''" />
        </a-form-model-item>
        <a-form-model-item has-feedback
                           label="简介："
                           prop="description">
          <a-textarea placeholder="填写数据介绍"
                      v-model="dataForm.description"
                      @keyup.enter="save('dataForm')"
                      allowClear
                      :dataForms="3" />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>
<script>
const columns = [
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
    align: "center",
    width: '15%',
    ellipsis: true,
    scopedSlots: { customRender: 'name' },
  },
  {
    title: '英文名',
    dataIndex: 'token',
    key: 'token',
    align: "center",
    width: '15%',
    ellipsis: true,
    scopedSlots: { customRender: 'token' },
  },
  {
    title: '类型',
    dataIndex: 'type',
    key: 'type',
    align: "center",
    width: '18%',
    ellipsis: true,
    scopedSlots: { customRender: 'type' },
  },
  {
    title: '默认值',
    dataIndex: 'defaultV',
    key: 'defaultV',
    align: "center",
    width: '15%',
    ellipsis: true,
    scopedSlots: { customRender: 'value' },
  },
  {
    title: '简介',
    width: "20%",
    dataIndex: 'description',
    key: 'description',
    align: "center",
    ellipsis: true,
    scopedSlots: { customRender: 'description' },
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

import { nanoid } from 'nanoid'
import dataApi from '@/api/data'
import { getUserInfo } from '@/utils/token'
export default {
  props: {
    tableData: {
      type: Array,
      default: function () {
        return []
      }
    },
    tableType: {
      type: String,
      default: ""
    },
    methodId: {
      type: Number
    },
    classId: {
      type: Number
    },
  },
  data() {
    return {
      data: this.tableData,
      dataId: "",
      // classId: "",
      enginId: sessionStorage.getItem('projectId'),
      visible: false,
      visible1: false,
      title: "",
      layout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 16 },
      },//对话框布局
      typeList: [
        {
          title: "整型",
          value: "0",
        },
        {
          title: "浮点型",
          value: "1",
        },
        {
          title: "布尔型",
          value: "2",
        },
        {
          title: "字符型",
          value: "3",
        },
        {
          title: "字符串",
          value: "4",
        },
        {
          title: "数组",
          value: "5",
        },
      ],
      dataForm: {
        key: "",
        name: "",
        token: "",
        type: this.tableType,// 普通成员变量 输入输出
        varType: "",//变量or常量
        dataType: "",//数据类型
        defaultV: "",
        description: ""
      },
      dataRules: {
        name: [{ required: true, message: '请输入数据名', trigger: 'change' }],
        varType: [{ required: true, message: '请选择常量/变量', trigger: 'change' }],
        dataType: [{ required: true, message: '请选择数据类型', trigger: 'change' }],
        defaultV: [{ required: true, message: '请输入默认值', trigger: 'change' }],
      },
      // data,
      columns,
    };
  },
  methods: {
    getData() {
      if (this.tableType === '1') {
        dataApi.getInOrOut(this.methodId, '1')
          .then((res) => {
            // console.log(res)
            if (res.code === 200) {
              this.data = res.data
            } else {
              this.data = []
              // this.$message.error('加载失败', 0.5);
            }
          })
      } else {
        dataApi.getInOrOut(this.methodId, '2')
          .then((res) => {
            // console.log(res)
            if (res.code === 200) {
              this.data = res.data
            } else {
              this.data = []
              // this.$message.error('加载失败', 0.5);
            }
            // this.$store.commit('SET_LOADING', false)
          })
      }

    },
    // 只允许输入整数
    limitNumber(value) {
      if (typeof value === 'string') {
        return !isNaN(Number(value)) ? value.replace(/\./g, '') : -1
      } else if (typeof value === 'number') {
        return !isNaN(value) ? String(value).replace(/\./g, '') : -1
      } else {
        return 0
      }
    },
    add(classId) {
      // console.log("add被调用了")
      this.classId = classId
      this.title = "增加数据"
      this.visible = true
      this.dataForm = {}
    },
    edit(id) {
      this.title = "编辑数据"
      this.dataId = id
      this.visible1 = true
      dataApi.queryById(id)
        .then((res) => {
          if (res.code === 200) {
            this.dataForm = res.data
          } else {
            this.$message.error("获取信息失败", 0.7)
          }
        })
        .catch((err) => {
          console.error(err)
        })
    },
    saveAdd(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = {
            key: nanoid(),
            userId: getUserInfo().id,
            classId: this.classId,
            engineeringIds: this.$store.getters.project.id,
            author: getUserInfo().nickName,
            name: this.dataForm.name,
            token: this.dataForm.token ? this.dataForm.token : 'data',
            type: this.tableType,
            defaultV: this.dataForm.defaultV,
            dataType: this.dataForm.dataType,
            varType: this.dataForm.varType,
            methodId: this.methodId,
            description: this.dataForm.description
          }
          console.log(data);
          dataApi.add(data)
            .then((res) => {
              if (res.code === 200) {
                this.$message.success("添加成功", 0.7)
                this.getData()
                this.visible = false
              } else {
                this.$message.error("添加失败", 0.7)
              }
            })
            .catch((err) => {
              console.log(err)
            })
        } else {
          this.$message.error("请填写完整", 0.7)
        }
      })
      this.visible = false
    },
    saveEdit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = {
            id: this.dataId,
            name: this.dataForm.name,
            token: this.dataForm.token ? this.dataForm.token : 'data',
            defaultV: this.dataForm.defaultV,
            dataType: this.dataForm.dataType,
            varType: this.dataForm.varType,
            description: this.dataForm.description
          }
          // console.log(data)
          dataApi.update(data)
            .then((res) => {
              if (res.code === 200) {
                this.$message.success("更新成功", 0.7)
                this.getData()
                this.visible1 = false
              } else {
                this.$message.error("更新失败", 0.7)
              }
            })
            .catch((err) => {
              console.log(err)
            })
        } else {
          this.$message.error("请填写完整", 0.7)
        }
      })
    },
    del(id) {
      dataApi.del(id)
        .then((res) => {
          if (res.code === 200) {
            this.$message.success("删除成功", 0.7)
            this.getData()
          } else {
            this.$message.error("删除失败", 0.7)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    close() {
      this.visible = false
      this.visible1 = false
      this.$refs['dataForm'].resetFields()
    }
  },
  computed: {
  },
  mounted() {
    // this.$bus.$on("closeEdit", this.close)
  },
  created() {
  },
  watch: {
    'dataForm.token': {
      handler(newValue) {
        if (newValue) {
          this.dataForm.token = newValue.replace(/[^a-zA-Z]/g, '')
        }

      }
    },
  }
};
</script>
<style scoped>
.editable-add-btn {
  margin-bottom: 12px;
}
.editable-dataForm-operations a {
  margin-right: 8px;
}
</style>
