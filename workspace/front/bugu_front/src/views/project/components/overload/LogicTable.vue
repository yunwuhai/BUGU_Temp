<!--
 * @Description: 逻辑操作 从文件中读取
 * @version: 1.0.0
 * @Author: WPO
 * @Date: 2022-04-07 15:09:46
 * @LastEditors: WPO
 * @LastEditTime: 2022-04-27 01:27:48
-->
<template>
  <div>
    <a-config-provider>
      <template #renderEmpty>
        <a-empty description="暂无逻辑" />
        <a-button @click="add({})">新建</a-button>
      </template>
      <a-table :columns="columns"
               :data-source="data"
               :expanded-row-keys.sync="expandedRowKeys">
        <template slot="operation"
                  slot-scope="text, record">
          <div class="editable-dataForm-operations">
            <span>
              <a @click="add(record)">新建</a>
              <a @click="edit(record)">编辑</a>
              <a-popconfirm title="确定删除吗？"
                            @confirm="del(record)">
                <a>删除</a>
              </a-popconfirm>
            </span>
          </div>
        </template>
      </a-table>
    </a-config-provider>

    <!-- 添加逻辑 -->
    <a-modal v-model="addVisible"
             title="新建语句"
             :closable="true"
             :maskClosable="false"
             @cancel="handleCancel"
             @ok="saveAdd('ruleForm')">
      <a-form-model ref="ruleForm"
                    :model="logicForm"
                    :rules="ruleForm"
                    v-bind="layout">
        <a-form-model-item has-feedback
                           label="语句类型："
                           prop="sentenceType">
          <a-select v-model="logicForm.sentenceType"
                    allowClear
                    autocomplete="off">
            <a-select-option v-for="item in senTypeList"
                             :key="item.value"
                             :value="item.title">
              {{item.title}}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="语句层级："
                           v-if="levelDis">
          <a-radio-group v-model="level"
                         :defaultValue="level">
            <a-radio :value="true">
              同级语句
            </a-radio>
            <a-radio :value="false">
              子语句
            </a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item has-feedback
                           label="简介："
                           prop="description">
          <a-textarea placeholder="语句简单介绍"
                      v-model="logicForm.description"
                      @keyup.enter="handleOk('ruleForm')"
                      allowClear
                      :rows="3" />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
    <!-- 修改语句 -->
    <a-modal v-model="editVisible"
             title="修改语句"
             :closable="true"
             :maskClosable="false"
             @cancel="handleCancel"
             @ok="saveEdit('ruleForm')">
      <a-form-model ref="ruleForm"
                    :model="logicForm"
                    :rules="ruleForm"
                    v-bind="layout">
        <a-form-model-item has-feedback
                           label="语句类型："
                           prop="sentenceType">
          <a-select v-model="logicForm.sentenceType"
                    allowClear
                    autocomplete="off">
            <a-select-option v-for="item in senTypeList"
                             :key="item.value"
                             :value="item.title">
              {{item.title}}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item has-feedback
                           label="简介："
                           prop="description">
          <a-textarea placeholder="语句简单介绍"
                      v-model="logicForm.description"
                      @keyup.enter="handleOk('ruleForm')"
                      allowClear
                      :rows="3" />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>
<script>
const columns = [
  {
    title: '语句类型',
    dataIndex: 'sentenceType',
    key: 'sentenceType',
    ellipsis: true,
  },
  {
    title: '简介',
    dataIndex: 'description',
    key: 'age',
    width: '50%',
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

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);
  },
};
import logicApi from '@/api/logic'
import { nanoid } from 'nanoid';

export default {
  props: {
    tableData: {
      type: Array,
      default: function () {
        return []
      }
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
      level: true,// 同级或下一级
      levelDis: true,
      layout: {
        labelCol: { span: 5 },
        wrapperCol: { span: 17 },
      },//对话框布局
      addVisible: false,
      editVisible: false,
      logicForm: {
        key: nanoid(),
        sentenceId: 1,
        sentenceType: "",
        description: ""
      },
      ruleForm: {
        sentenceType: [{ required: true, message: '选择语句类型', trigger: 'change' }],
        // level: [{ required: true, message: '选择语句层级', trigger: 'change' }],
      },
      id: sessionStorage.getItem('projectId'), // 项目id
      data: this.tableData,
      nowKey: "",
      nowRow: {},
      columns,
      rowSelection,
      expandedRowKeys: [],
      senTypeList: [
        {
          title: "选择",
          value: "1"
        },
        {
          title: "循环",
          value: "2"
        },
      ]
    };
  },
  methods: {
    findTypeId(type) {
      for (let i = 0; i < this.senTypeList.length; i++) {
        if (this.senTypeList[i].title === type) {
          return this.senTypeList[i].value
        }
      }
    },

    filterData(data, key) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].key === key) {
          data.splice(i, 1)
          return
        }
        if (data[i].children !== undefined) {
          if (data[i].children.length) {
            this.filterData(data[i].children, key)
          } else {
            delete data[i].children
          }
        }
      }
    },
    del(record) {
      this.filterData(this.data, record.key)
      // console.log(this.data);
      let req = {
        eid: +this.id,
        cid: this.classId,
        mid: this.methodId,
        data: this.data
      }
      this.$store.commit('UPDATE_LOGIC', this.data)
      logicApi.deleteLogic(req)
        .then((res) => {
          // console.log(res)
          if (res.code === 200) {
            this.data = res.data
            this.$message.success("删除成功", 0.5)
          } else {
            this.$message.error("删除失败", 0.5)
          }
        })
        .catch(() => {
          this.$message.error('新建失败', 0.5)
          this.resetForm('ruleForm')
        })
    },
    findLevel(data, key) {
      // console.log(this.logic + Form)
      for (let i = 0; i < data.length; i++) {
        if (data[i].key === key) {
          // 同级
          if (this.level) {
            data.push({
              key: nanoid(),
              sentenceId: this.findTypeId(this.logicForm.sentenceType),
              sentenceType: this.logicForm.sentenceType,
              description: this.logicForm.description
            })
          }
          // 下一级 
          else {
            if (data[i].children === undefined) {
              data[i].children = []
            }
            data[i].children.push({
              key: nanoid(),
              sentenceId: this.findTypeId(this.logicForm.sentenceType),
              sentenceType: this.logicForm.sentenceType,
              description: this.logicForm.description
            })
          }
          return
        }
        if (data[i].children !== undefined) {
          if (data[i].children.length) {
            this.findLevel(data[i].children, key)
          }
        }
      }
    },
    add(record) {
      if (this.data.length) {
        this.levelDis = true
      } else {
        this.levelDis = false
      }
      if (record.key) {
        this.nowKey = record.key
      } else {
        this.nowKey = ""
      }
      this.logicForm = {}
      this.addVisible = true
    },
    saveAdd(formName) {
      if (this.nowKey) {
        this.findLevel(this.data, this.nowKey)
      } else {
        this.data.push({
          key: nanoid(),
          sentenceId: this.findTypeId(this.logicForm.sentenceType),
          sentenceType: this.logicForm.sentenceType,
          description: this.logicForm.description
        })
      }
      let req = {
        eid: +this.id,
        cid: this.classId,
        mid: this.methodId,
        data: this.data
      }
      // console.log(this.$refs[formName])
      this.$refs[formName].validate(valid => {
        if (valid) {
          logicApi.addLogic(req)
            .then((res) => {
              if (res.code === 200) {
                this.data = res.data
              } else {
                this.$message.error("新建失败", 0.5)
              }
              this.addVisible = false
            })
            .catch(() => {
              this.$message.error('新建失败', 0.5)
              this.resetForm('ruleForm')
            })
        } else {
          this.$message.error("新建失败", 0.5)
        }
      })
    },
    findRow(data, key) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].key === key) {
          data[i] = this.logicForm
          return
        }
        if (data[i].children !== undefined) {
          if (data[i].children.length) {
            this.findRow(data[i].children, key)
          }
        }
      }
    },
    edit(record) {
      this.editVisible = true
      this.nowKey = record.key
      this.logicForm = Object.assign({}, record)
      // console.log(this.logicForm)
    },
    saveEdit(formName) {
      this.findRow(this.data, this.nowKey)
      // console.log(this.logicForm)
      let req = {
        eid: +this.id,
        cid: this.classId,
        mid: this.methodId,
        data: this.data
      }
      // console.log(this.data);
      this.$refs[formName].validate(valid => {
        if (valid) {
          logicApi.updateLogic(req)
            .then((res) => {
              if (res.code === 200) {
                this.data = res.data
              } else {
                this.$message.error("修改失败", 0.5)
              }
              this.editVisible = false
            })
            .catch(() => {
              this.$message.error('修改失败', 0.5)
              this.resetForm('ruleForm')
            })
        } else {
          this.$message.error("修改失败", 0.5)
        }
      })
    },
    handleCancel() {
      this.addVisible = false
      this.editVisible = false
      this.resetForm('ruleForm')
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  created() {
    // console.log(this.$store.getters.desData)
  }
};
</script>
<style scoped>
.editable-dataForm-operations a {
  margin-right: 8px;
}
</style>