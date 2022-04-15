<!-- 侧边栏的目录树及其操作 -->
<template>
  <div>
    <!-- 树形结构 -->
    <a-tree style="padding-left:20px;"
            showIcon
            showLine
            :selectable="false"
            :treeData="treeData"
            :expandedKeys.sync="expandedKeys"
            onselectstart="return false;"
            @rightClick="onEventTreeNode">

      <!-- 下拉菜单被渲染进每一个树节点 -->
      <template #title="nodeData">
        <a-dropdown :trigger="['contextmenu']">
          <span @dblclick.stop="openTab(nodeData)"
                v-if="!nodeData.dataRef.editStatus">
            <a-popover trigger="hover"
                       placement="right">
              <template slot="title">
                <a-tag color="orange"
                       v-if="nodeData.dataRef.level===1">
                  组件
                </a-tag>
                <a-tag color="green"
                       v-if="nodeData.dataRef.level===2">
                  类
                </a-tag>
                <a-tag color="cyan"
                       v-if="nodeData.dataRef.level===3 && nodeData.dataRef.type !== '4'">
                  方法
                </a-tag>
                <a-tag color="pink"
                       v-else-if="nodeData.dataRef.level===3 && nodeData.dataRef.type ==='4'">
                  属性
                </a-tag>
                <a-tag color="blue"
                       v-if="nodeData.dataRef.level===4">
                  重载
                </a-tag>
                <a-tag color="red">
                  作者:{{nodeData.dataRef.author}}
                </a-tag>
              </template>
              <template slot="content">
                {{nodeData.dataRef.description}}
              </template>
              {{ nodeData.dataRef.title }}
            </a-popover>
          </span>
          <!-- 右键点击菜单 -->
          <template #overlay>
            <a-menu v-if="delDis && (nodeData.dataRef.type !== '4') &&(nodeData.dataRef.type !== '6')">
              <a-menu-item key="1"
                           :disabled="(nodeData.dataRef.type === '0')&&(nodeData.dataRef.level > 1) "
                           v-if="project.type !=='1'"
                           @click="addSame(nodeData.dataRef.level)">
                <a-icon type="plus-circle" />
                <span v-if="nodeData.dataRef.level===1">新建组件</span>
                <span v-else-if="nodeData.dataRef.level===2">新建类</span>
                <span v-else-if="nodeData.dataRef.level===3">新建方法</span>
                <span v-else-if="nodeData.dataRef.level===4">新建重载</span>
              </a-menu-item>
              <a-menu-item key="2"
                           v-if="(nodeData.dataRef.type !== '0') &&(nodeData.dataRef.level !== 4)"
                           @click="addNext(nodeData.dataRef.level)">
                <a-icon type="plus" />
                <span v-if="nodeData.dataRef.level===1">新建类</span>
                <span v-else-if="nodeData.dataRef.level===2">新建方法</span>
                <span v-else-if="nodeData.dataRef.level===3">新建重载</span>
              </a-menu-item>
              <a-menu-item key="3"
                           v-if="nodeData.dataRef.type !== '0'"
                           @click="editTreeNode(nodeData.dataRef.level)">
                <a-icon type="edit" />编辑信息
              </a-menu-item>
              <a-menu-item key="4"
                           v-if="nodeData.dataRef.type !== '0'">
                <a-popconfirm title="确定删除吗？"
                              placement="topLeft"
                              @cancel="cancel"
                              @confirm="delTreeNode()">
                  <a-icon type="delete" />删除
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </template>
    </a-tree>

    <!--新建组件的对话框 -->
    <a-modal v-model="componentVisible"
             :title="componentTitle"
             :closable="true"
             :maskClosable="true"
             @ok="saveComponentAddSame('componentForm')"
             @cancel="closeComponent">
      <a-form-model ref="componentForm"
                    :model="componentForm"
                    :rules="componentRules"
                    v-bind="layout">
        <a-form-model-item has-feedback
                           label="组件名称："
                           prop="name">
          <a-input v-model="componentForm.name"
                   :autoFocus="true"
                   ref="name"
                   type="text"
                   allowClear
                   autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item label="组件英文名："
                           prop="token">
          <a-input v-model="componentForm.token"
                   ref="token"
                   type="text"
                   allowClear
                   autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item label="抽象组件："
                           prop="abstract">
          <a-radio-group name="abstract"
                         v-model="componentForm.abstract"
                         ref="abstract">
            <a-radio value="1">
              是
            </a-radio>
            <a-radio value="0">
              否
            </a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item has-feedback
                           label="简介："
                           prop="description">
          <a-textarea placeholder="填写组件介绍"
                      v-model="componentForm.description"
                      @keyup.enter="saveComponentEdit('componentForm')"
                      allowClear
                      :rows="3" />
        </a-form-model-item>
      </a-form-model>
    </a-modal>

    <!--修改组件的对话框 -->
    <a-modal v-model="componentVisible1"
             :title="componentTitle"
             :closable="true"
             :maskClosable="true"
             @ok="saveComponentEdit('componentForm')"
             @cancel="closeComponent">
      <a-form-model ref="componentForm"
                    :model="componentForm"
                    :rules="componentRules"
                    v-bind="layout">
        <a-form-model-item label="组件名称："
                           prop="name">
          <a-input v-model="componentForm.name"
                   ref="name"
                   :autoFocus="true"
                   type="text"
                   allowClear
                   autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item label="组件英文名："
                           prop="token">
          <a-input v-model="componentForm.token"
                   ref="token"
                   type="text"
                   allowClear
                   autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item label="抽象组件："
                           prop="abstract">
          <a-radio-group name="abstract"
                         v-model="componentForm.abstract"
                         ref="abstract">
            <a-radio value="1">
              是
            </a-radio>
            <a-radio value="0">
              否
            </a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item has-feedback
                           label="简介："
                           prop="description">
          <a-textarea placeholder="填写组件介绍"
                      v-model="componentForm.description"
                      @keyup.enter="saveComponentEdit('componentForm')"
                      allowClear
                      :rows="3" />
        </a-form-model-item>
      </a-form-model>
    </a-modal>

    <!--新建类的对话框 -->
    <a-modal v-model="classVisible"
             :title="classTitle"
             :closable="true"
             :maskClosable="true"
             @ok="saveClassAddSame('classForm')"
             @cancel="closeClass">
      <a-form-model ref="classForm"
                    :model="classForm"
                    :rules="classRules"
                    v-bind="layout">
        <a-form-model-item has-feedback
                           label="类名称："
                           prop="name">
          <a-input v-model="classForm.name"
                   ref="name"
                   :autoFocus="true"
                   type="text"
                   allowClear
                   autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item label="类英文名："
                           prop="token">
          <a-input v-model="classForm.token"
                   ref="token"
                   type="text"
                   allowClear
                   autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item label="是否可继承："
                           prop="extend">
          <a-radio-group name="extend"
                         v-model="classForm.extend"
                         ref="extend">
            <a-radio value="0">
              否
            </a-radio>
            <a-radio value="1">
              是
            </a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item has-feedback
                           label="选择父类："
                           prop="parentId">
          <a-select v-model="classForm.parentId"
                    ref="parentId"
                    allowClear
                    autocomplete="off">
            <!-- v-for -->
            <a-select-option v-for="item in parentList"
                             :key="item.id"
                             :value="item.id">
              {{item.name}}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item has-feedback
                           label="选择芯片："
                           prop="chipId">
          <a-select v-model="classForm.chipId"
                    ref="chipId"
                    allowClear
                    autocomplete="off">
            <!-- v-for -->
            <a-select-option value="0">
              芯片1
            </a-select-option>
            <a-select-option value="1">
              芯片2
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item has-feedback
                           label="简介："
                           prop="description">
          <a-textarea placeholder="填写类介绍"
                      v-model="classForm.description"
                      @keyup.enter="saveClassAddSame('classForm')"
                      allowClear
                      :rows="3" />
        </a-form-model-item>
      </a-form-model>
    </a-modal>

    <!--编辑类的对话框 -->
    <a-modal v-model="classVisible1"
             :title="classTitle"
             :closable="true"
             :maskClosable="true"
             @ok="saveClassEdit('classForm')"
             @cancel="closeClass">
      <a-form-model ref="classForm"
                    :model="classForm"
                    :rules="classRules"
                    v-bind="layout">
        <a-form-model-item has-feedback
                           label="类名称："
                           prop="name">
          <a-input v-model="classForm.name"
                   ref="name"
                   type="text"
                   :autoFocus="true"
                   allowClear
                   autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item label="类英文名："
                           prop="token">
          <a-input v-model="classForm.token"
                   ref="token"
                   type="text"
                   allowClear
                   autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item label="是否可继承："
                           prop="extend">
          <a-radio-group name="extend"
                         v-model="classForm.extend"
                         ref="extend">
            <a-radio value="0">
              否
            </a-radio>
            <a-radio value="1">
              是
            </a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item has-feedback
                           label="选择父类："
                           prop="parentId">
          <a-select v-model="classForm.parentId"
                    ref="parentId"
                    allowClear
                    autocomplete="off">
            <!-- v-for -->
            <a-select-option v-for="item in parentList"
                             :key="item.id"
                             :value="item.id">
              {{item.name}}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item has-feedback
                           label="选择芯片："
                           prop="chipId">
          <a-select v-model="classForm.chipId"
                    ref="chipId"
                    allowClear
                    autocomplete="off">
            <!-- v-for -->
            <a-select-option value="0">
              芯片1
            </a-select-option>
            <a-select-option value="1">
              芯片2
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item has-feedback
                           label="简介："
                           prop="description">
          <a-textarea placeholder="填写类介绍"
                      v-model="classForm.description"
                      @keyup.enter="saveClassEdit('classForm')"
                      allowClear
                      :rows="3" />
        </a-form-model-item>
      </a-form-model>
    </a-modal>

    <!--新建方法的对话框 -->
    <a-modal v-model="methodVisible"
             :title="methodTitle"
             :closable="true"
             :maskClosable="true"
             @ok="saveMethodAddSame('methodForm')"
             @cancel="closeMethod">
      <a-form-model ref="methodForm"
                    :model="methodForm"
                    :rules="methodRules"
                    v-bind="layout">
        <a-form-model-item has-feedback
                           label="方法名称："
                           prop="name">
          <a-input v-model="methodForm.name"
                   ref="name"
                   type="text"
                   :autoFocus="true"
                   allowClear
                   autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item label="方法英文名："
                           prop="token">
          <a-input v-model="methodForm.token"
                   ref="token"
                   type="text"
                   allowClear
                   autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item has-feedback
                           label="简介："
                           prop="description">
          <a-textarea placeholder="填写组件介绍"
                      v-model="methodForm.description"
                      @keyup.enter="saveMethodAddSame('methodForm')"
                      allowClear
                      :rows="3" />
        </a-form-model-item>
      </a-form-model>
    </a-modal>

    <!--编辑方法的对话框 -->
    <a-modal v-model="methodVisible1"
             :title="methodTitle"
             :closable="true"
             :maskClosable="true"
             @ok="saveMethodEdit('methodForm')"
             @cancel="closeMethod">
      <a-form-model ref="methodForm"
                    :model="methodForm"
                    :rules="methodRules"
                    v-bind="layout">
        <a-form-model-item has-feedback
                           label="方法名称："
                           prop="name">
          <a-input v-model="methodForm.name"
                   ref="name"
                   type="text"
                   :autoFocus="true"
                   allowClear
                   autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item label="方法英文名："
                           prop="token">
          <a-input v-model="methodForm.token"
                   ref="token"
                   type="text"
                   allowClear
                   autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item has-feedback
                           label="简介："
                           prop="description">
          <a-textarea placeholder="填写方法介绍"
                      v-model="methodForm.description"
                      @keyup.enter="saveMethodEdit('methodForm')"
                      allowClear
                      :rows="3" />
        </a-form-model-item>
      </a-form-model>
    </a-modal>

    <!--新建重载的对话框 -->
    <a-modal v-model="overloadVisible"
             :title="overloadTitle"
             :closable="true"
             :maskClosable="true"
             @ok="saveOverloadAddSame('overloadForm')"
             @cancel="closeOverload">
      <a-form-model ref="overloadForm"
                    :model="overloadForm"
                    :rules="overloadRules"
                    v-bind="layout">
        <a-form-model-item has-feedback
                           label="重载名称："
                           prop="name">
          <a-input v-model="overloadForm.name"
                   :disabled="true"
                   ref="name"
                   :autoFocus="true"
                   type="text"
                   allowClear
                   autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item label="重载英文名："
                           prop="token">
          <a-input v-model="overloadForm.token"
                   :disabled="true"
                   ref="token"
                   type="text"
                   allowClear
                   autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item label="是否公开："
                           prop="auth">
          <a-radio-group name="auth"
                         v-model="overloadForm.auth"
                         ref="auth">
            <a-radio value="1">
              是
            </a-radio>
            <a-radio value="0">
              否
            </a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item has-feedback
                           label="简介："
                           prop="description">
          <a-textarea placeholder="填写方法介绍"
                      v-model="overloadForm.description"
                      @keyup.enter="saveOverloadAddSame('overloadForm')"
                      allowClear
                      :rows="3" />
        </a-form-model-item>
      </a-form-model>
    </a-modal>

    <!--编辑重载的对话框 -->
    <a-modal v-model="overloadVisible1"
             :title="overloadTitle"
             :closable="true"
             :maskClosable="true"
             @ok="saveOverloadEdit('overloadForm')"
             @cancel="closeOverload">
      <a-form-model ref="overloadForm"
                    :model="overloadForm"
                    :rules="overloadRules"
                    v-bind="layout">
        <a-form-model-item has-feedback
                           label="重载名称："
                           prop="name">
          <a-input v-model="overloadForm.name"
                   :disabled="true"
                   ref="name"
                   :autoFocus="true"
                   type="text"
                   allowClear
                   autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item label="重载英文名："
                           prop="token">
          <a-input v-model="overloadForm.token"
                   :disabled="true"
                   ref="token"
                   type="text"
                   allowClear
                   autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item label="是否公开："
                           prop="auth">
          <a-radio-group name="auth"
                         v-model="overloadForm.auth"
                         ref="auth">
            <a-radio value="1">
              是
            </a-radio>
            <a-radio value="0">
              否
            </a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item has-feedback
                           label="简介："
                           prop="description">
          <a-textarea placeholder="填写重载介绍"
                      v-model="overloadForm.description"
                      @keyup.enter="saveOverloadEdit('overloadForm')"
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
import { getUserInfo } from "@/utils/token"
import treeApi from '@/api/tree'
import componentApi from '@/api/component'
import classApi from '@/api/class'
import methodApi from '@/api/method'
import dataApi from '@/api/data'

export default {
  //import引入的组件需要注入到对象中才能使用
  name: 'DirectoryTree',
  props: {
    delDis: {
      type: Boolean,
      default: false
    },
    treeData: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data() {
    //这里存放数据
    return {
      id: sessionStorage.getItem('projectId'),
      project: this.$store.getters.project,
      author: getUserInfo().nickName,
      object: false,//是否是属性编辑选项
      main: false,//是否是核心
      layout: {
        labelCol: { span: 5 },
        wrapperCol: { span: 17 },
      },//对话框布局
      editStatus: "",

      componentVisible: false,
      componentVisible1: false,
      componentTitle: "",
      componentForm: {
        id: "",//组件id
        name: "",//组件名
        token: "",//英文名
        abstract: "0",//是否为抽象组件
        description: ""//组件介绍
      },
      componentRules: {
        name: [{ required: true, message: '请输入类名', trigger: 'change' }],
        abstract: [{ required: true, message: '请选择是否是抽象组件', trigger: 'change' }],
      },

      classVisible: false,
      classVisible1: false,
      classTitle: "",
      classForm: {
        id: "",//类id
        name: "",//类名
        token: "",//英文名
        extend: "0",//是否可继承
        parentId: "0",//父类 可设置默认值
        chipId: "0",//移植芯片
        description: "",//简介
        attrsId: [],//属性库的ID
        methodsId: []//方法库的ID
      },
      classRules: {
        name: [{ required: true, message: '请输入类名', trigger: 'change' }],
        parentId: [{ required: true, message: '请选择父类', trigger: 'change' }],
        extend: [{ required: true, message: '请选择是否可继承', trigger: 'change' }],
        chipId: [{ required: true, message: '请选择移植芯片', trigger: 'change' }],
      },

      methodVisible: false,
      methodVisible1: false,
      methodTitle: "",
      methodForm: {
        id: "",
        name: "",
        token: "",//英文名
        description: "",//简介
      },
      methodRules: {
        name: [{ required: true, message: '请输入方法名', trigger: 'change' }],
      },

      overloadVisible: false,
      overloadVisible1: false,
      overloadTitle: "",
      overloadForm: {
        id: "",
        name: "",
        token: "",//英文名
        description: "",//简介
        auth: "1",//权限 公开1或者私有0
        inAttrsId: "",//输入参数表id
        outAttrsId: "",//输出参数表id
        content: []//具体逻辑
      },
      overloadRules: {
        name: [{ required: true, message: '请输入方法名', trigger: 'change' }],
        auth: [{ required: true, message: '请选择权限', trigger: 'change' }],
      },
      treeNode: {},
      // 查找父级数据
      parentData: {},
      newTreeNode: {},
      expandedKeys: [],
      parentList: []
    };
  },
  components: {},
  //监听属性 类似于data概念
  computed: {
  },
  //监控data中的数据变化
  watch: {
    'componentForm.token': {
      handler(newValue) {
        if (newValue) {
          this.componentForm.token = newValue.replace(/[^a-zA-Z]/g, '')
        }

      }
    },
    'classForm.token': {
      handler(newValue) {
        if (newValue) {
          this.classForm.token = newValue.replace(/[^a-zA-Z]/g, '')
        }

      }
    },
    'methodForm.token': {
      handler(newValue) {
        if (newValue) {
          this.methodForm.token = newValue.replace(/[^a-zA-Z]/g, '')
        }

      }
    },
    'overloadForm.token': {
      handler(newValue) {
        if (newValue) {
          this.overloadForm.token = newValue.replace(/[^a-zA-Z]/g, '')
        }

      }
    }
  },
  //方法集合
  methods: {
    getParentList(classId) {
      // console.log(this.treeNode.dataRef.classId)
      classApi.getParentList(classId)
        .then((res) => {
          console.log(res)
          if (res.code === 200) {
            this.parentList = res.data
          }
        })
    },
    getTree() {
      /* 
        向后端请求系统已有的组件目录树
      */
      // treeApi.getTree(1, 0)
      //   .then((res) => {
      //     // this.systemTree = res.data
      //     this.$store.commit('SET_SYSTEMTREE', res.data)
      //   })
      //   .catch((err) => {
      //     this.$message.error("系统组件获取失败", 0.7)
      //     console.error(err)
      //   })

      treeApi.getTree(getUserInfo().id, +this.id)
        .then((res) => {
          // this.userTree = res.data
          this.$store.commit('SET_USERTREE', res.data)
        })
        .catch((err) => {
          this.$message.error("用户组件获取失败", 0.7)
          console.error(err)
        })
    },
    nextFocus(name) {
      this.$refs[name].focus()
    },
    //全局事件总线 绑定的自定义函数
    clearExpand(clear) {
      this.expandedKeys = clear
    },
    //双击在右侧打开选项卡
    openTab(node) {
      let nodeData = node.dataRef
      // console.log(node)

      if (nodeData.level < 4) {
        if (nodeData.type === "4") {
          // if (!this.$store.getters.visible) {
          this.$message.success('进入数据对象编辑', 0.5);
          this.$store.commit('SET_ADDSTATUS', true)
          this.$store.commit('SET_CLASSID', node.classId)
          dataApi.queryByClass(getUserInfo().id, node.classId)
            .then((res) => {
              // console.log(res)
              if (res.code === 200) {
                this.$store.commit('SET_TABLEDATA', res.data)
              } else {
                this.$store.commit('CLEAR_TABLEDATA')
              }
            })
          this.$store.commit('SET_TITLE', nodeData.title)
          this.$store.commit('SET_VISIBLE', true)
          this.$store.commit('SET_PLACEMENT', 'bottom')
          this.$store.commit('SET_WRAP', { marginLeft: '17.6%', width: '81%' })

          // } else {
          //   this.$message.info(nodeData.title + '已打开', 0.5);
          // }
        } else {
          this.$message.error('不能开启选项卡', 0.5);
        }
      } else {
        //不能重复打开选项卡
        if (this.$store.getters.keys.indexOf(nodeData.id) === -1) {
          console.log(nodeData.id)

          this.$store.commit("SET_KEYS", nodeData.id)
          this.$store.commit("SET_ACTIVE", nodeData.id)
          // key为方法id
          let contentIn = []
          let contentOut = []
          this.$store.commit('SET_PANES', { title: nodeData.title, key: nodeData.id, contentIn: [], contentOut: [] })
          this.$message.success('成功打开选项卡', 0.5);
          // 输入参数
          this.$store.commit('SET_LOADING', true)
          dataApi.getInOrOut(nodeData.id, '1')
            .then((res) => {
              console.log(res)
              if (res.code === 200) {
                contentIn = res.data
                dataApi.getInOrOut(nodeData.id, '2')
                  .then((res) => {
                    console.log(res)
                    if (res.code === 200) {
                      contentOut = res.data
                      this.$store.commit({
                        type: 'UPDATE_PANES',
                        contentIn: contentIn,
                        contentOut: contentOut
                      })
                      //this.$message.success('成功加载了contentIn和contentOut', 0.5);
                    } else {
                      contentOut = []
                      this.$message.error('加载失败', 0.5);
                    }
                    this.$store.commit('SET_LOADING', false)
                  })
              } else {
                contentIn = []
                this.$message.error('加载失败', 0.5);
              }
            })
          // 输出参数



        } else {
          this.$store.commit("SET_ACTIVE", nodeData.id)
          this.$message.info(nodeData.title + '已打开', 0.5);
        }
      }
    },
    // 右键点击树形结点时
    onEventTreeNode(e) {
      //获取当前结点信息
      // console.log("当前的结点信息改变")
      this.treeNode = e.node
      this.parentData = this.treeNode.$parent.dataRef
      // console.log(this.treeNode.dataRef.key[0])
    },
    //判断添加的是类还是方法
    addSame(level) {
      this.editStatus = "same"
      switch (level) {
        case 1:
          this.componentForm = {}
          this.componentVisible = true
          this.componentTitle = "添加新组件"
          break
        case 2:
          this.classForm = {}
          this.getParentList()
          this.classVisible = true
          this.classTitle = "添加新类"
          break
        case 3:
          this.methodForm = {}
          this.methodVisible = true
          this.methodTitle = "添加新方法"
          break
      }
    },
    //判断添加下一级
    addNext(level) {
      this.editStatus = "next"
      switch (level) {
        case 1:
          this.classForm = {}
          this.getParentList()
          this.classVisible = true
          this.classTitle = "添加新类"
          break
        case 2:
          this.methodForm = {}
          this.methodVisible = true
          this.methodTitle = "添加新方法"
          break
        case 3:
          this.overloadVisible = true
          this.overloadTitle = "新建方法重载"
          this.overloadForm.name = this.treeNode.dataRef.name,
            this.overloadForm.token = this.treeNode.dataRef.token
          break
      }
    },
    //判断编辑的是哪一级
    editTreeNode(level) {
      let data = this.treeNode.dataRef
      // console.log(data)
      switch (level) {
        case 1:
          //根据id从后端获取数据
          this.componentForm = {
            name: data.name,
            token: data.token,
            abstract: data.type === '1' ? '1' : '0',
            description: data.description
          }
          this.componentVisible1 = true
          this.componentTitle = "修改组件信息"
          break
        case 2:
          classApi.queryById(data.id)
            .then((res) => {
              if (res.code === 200) {
                this.getParentList(data.id)
                this.classVisible1 = true
                this.classForm = res.data
                this.classTitle = "修改类信息"
              }
            })
            .catch((err) => {
              console.error(err)
              this.classVisible1 = false
            })
          break
        case 3:
          this.methodForm = {
            name: data.name,
            token: data.token,
            description: data.description
          }
          this.methodVisible1 = true
          this.methodTitle = "修改方法信息"
          break
        case 4:
          methodApi.queryById(data.id)
            .then((res) => {
              if (res.code === 200) {
                this.overloadVisible1 = true
                this.overloadForm = res.data
                this.overloadTitle = "修改重载信息"
              }
            })
            .catch((err) => {
              console.error(err)
              this.overloadVisible1 = false
            })
          break
      }
    },

    // 保存新建
    saveComponentAddSame(formName) {
      this.expandedKeys.push(this.treeNode.dataRef.key)
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 从对话框中获取 
          this.newTreeNode = {
            userId: getUserInfo().id,
            author: this.author,
            name: this.componentForm.name,
            token: this.componentForm.token ? this.componentForm.token : "component",
            type: this.componentForm.abstract === '1' ? "1" : "2",
            description: this.componentForm.description,
            engineeringIds: this.treeNode.dataRef.engineeringIds
          }
          /*
            后端接口 提交componentForm
          */
          componentApi.add(this.newTreeNode)
            .then((res) => {
              if (res.code === 200) {
                this.$message.success(res.msg, 0.5)
                this.$nextTick(this.getTree())
                this.componentVisible = false
                this.$refs[formName].resetFields()
              } else {
                this.$message.error(res.msg, 0.5)
              }
            })
            .catch((err) => {
              console.error(err)
              this.$message.error('新建组件失败', 0.5)
            })
        }
        this.newTreeNode = {}
      })
    },
    saveClassAddSame(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.newTreeNode = {
            userId: getUserInfo().id,
            componentId: this.editStatus === "same" ? this.parentData.id : this.treeNode.dataRef.id,
            author: this.author,
            name: this.classForm.name,
            token: this.classForm.token ? this.classForm.token : "class",
            type: "2",
            extend: this.classForm.extend,
            parentId: this.classForm.parentId,
            description: this.classForm.description,
            engineeringIds: this.treeNode.dataRef.engineeringIds
          }
          // console.log(this.newTreeNode)
          /*
            后端接口 提交componentForm
          */
          classApi.add(this.newTreeNode)
            .then((res) => {
              if (res.code === 200) {
                this.$message.success(res.msg, 0.5)
                this.$nextTick(this.getTree())
                this.classVisible = false
                this.$refs[formName].resetFields()
              } else {
                this.$message.error(res.msg, 0.5)
              }
            })
            .catch((err) => {
              console.error(err)
              this.$message.error('新建类失败', 0.5)
            })
        }
      })
    },
    saveMethodAddSame(formName) {
      this.expandedKeys.push(this.treeNode.dataRef.key)
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 从对话框中获取 
          this.newTreeNode = {
            userId: getUserInfo().id,
            classId: this.editStatus === "same" ? this.parentData.id : this.treeNode.dataRef.id,
            author: this.author,
            name: this.methodForm.name,
            token: this.methodForm.token ? this.methodForm.token : "method",
            description: this.methodForm.description,
            type: "2",
            auth: '1',// 公开
            engineeringIds: this.treeNode.dataRef.engineeringIds
          }
          /*
            后端接口 提交componentForm
          */
          methodApi.add(this.newTreeNode)
            .then((res) => {
              if (res.code === 200) {
                this.$message.success(res.msg, 0.5)
                this.$nextTick(this.getTree())
                this.methodVisible = false
                this.$refs[formName].resetFields()
              } else {
                this.$message.error(res.msg, 0.5)
              }
            })
            .catch((err) => {
              console.error(err)
              this.$message.error('新建方法失败', 0.5)
            })
        }
      })
    },
    saveOverloadAddSame(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 从对话框中获取 
          this.newTreeNode = {
            userId: getUserInfo().id,
            classId: this.treeNode.dataRef.classId,
            author: this.author,
            name: this.overloadForm.name,
            token: this.overloadForm.token ? this.overloadForm.token : "overload",
            type: "5",
            description: this.overloadForm.description,
            auth: "1",
            engineeringIds: this.treeNode.dataRef.engineeringIds
          }
          console.log(this.newTreeNode)
          /*
            后端接口 提交componentForm
          */
          methodApi.add(this.newTreeNode)
            .then((res) => {
              if (res.code === 200) {
                this.$message.success("新建重载成功", 0.5)
                this.$nextTick(this.getTree())
                this.overloadVisible = false
                this.$refs[formName].resetFields()

              } else {
                this.$message.error('新建重载失败', 0.5)
              }
            })
            .catch((err) => {
              console.error(err)
              this.$message.error('新建重载失败', 0.5)
            })
        }
      })
    },

    //保存修改
    saveComponentEdit(formName) {
      let data = this.treeNode.dataRef
      this.$refs[formName].validate(valid => {
        if (valid) {
          data.name = this.componentForm.name
          data.token = this.componentForm.token ? this.componentForm.token : "component"
          data.type = this.componentForm.abstract === '1' ? "1" : "2",
            data.description = this.componentForm.description
          componentApi.update(data)
            .then((res) => {
              if (res.code === 200) {
                this.$message.success(res.msg, 1);
                this.$nextTick(this.getTree())
                this.componentVisible1 = false
              } else {
                this.$message.error(res.msg, 1);
                console.log(res.msg)
              }
            })
            .catch((err) => {
              console.error(err)
            })
        } else {
          this.$message.success('请填写完整', 0.5);
        }
      })
    },
    saveClassEdit(formName) {
      this.getParentList()
      let data = this.treeNode.dataRef
      this.$refs[formName].validate(valid => {
        if (valid) {
          data.name = this.classForm.name
          data.token = this.classForm.token ? this.componentForm.token : "component"
          data.extend = this.classForm.extend
          data.parentId = this.classForm.parentId
          data.chipId = this.classForm.chipId
          data.description = this.classForm.description
          classApi.update(data)
            .then((res) => {
              if (res.code === 200) {
                this.$message.success(res.msg, 1);
                this.$nextTick(this.getTree())
                this.classVisible1 = false
              } else {
                this.$message.error(res.msg, 1);
                console.log(res.msg)
              }
            })
            .catch((err) => {
              console.error(err)
            })
        } else {
          this.$message.success('请填写完整', 0.5);
        }
      })
    },
    saveMethodEdit(formName) {
      let data = this.treeNode.dataRef
      let oldName = data.name
      this.$refs[formName].validate(valid => {
        if (valid) {
          data.name = this.methodForm.name
          data.token = this.methodForm.token ? this.methodForm.token : "component"
          data.description = this.methodForm.description
          // 先更新重载
          methodApi.updateOverload({ name: data.name, token: data.token, oldName: oldName })
            .then((res) => {
              if (res.code === 200) {
                this.$message.success(res.msg, 1);
                console.log(res.data)
                // this.$nextTick(this.getTree())
              }
            })
          methodApi.update(data)
            .then((res) => {
              if (res.code === 200) {
                this.$message.success(res.msg, 1);
                this.$nextTick(this.getTree())
                this.expandedKeys.push(res.data.key)
                this.methodVisible1 = false
              } else {
                this.$message.error(res.msg, 1);
                console.log(res.msg)
              }
            })
            .catch((err) => {
              console.error(err)
            })
        } else {
          this.$message.success('请填写完整', 0.5);
        }
      })
    },
    saveOverloadEdit(formName) {
      let data = this.treeNode.dataRef
      this.$refs[formName].validate(valid => {
        if (valid) {
          data.auth = this.overloadForm.auth
          data.description = this.overloadForm.description
          methodApi.update(data)
            .then((res) => {
              if (res.code === 200) {
                this.$message.success(res.msg, 1);
                this.$nextTick(this.getTree())
                this.overloadVisible1 = false
              } else {
                this.$message.error(res.msg, 1);
                console.log(res.msg)
              }
            })
            .catch((err) => {
              console.error(err)
            })
        } else {
          this.$message.success('请填写完整', 0.5);
        }
      })
    },

    //删除树形结点后若有打开的选项卡也关闭
    removeTabs() {
      if (this.$store.getters.keys.indexOf(this.treeNode.dataRef.key) > -1) {
        this.$store.commit("REMOVE_KEYS", this.treeNode.dataRef.key)
        this.$store.commit("REMOVE_PANES", this.treeNode.dataRef.key)
        this.$store.commit("SET_ACTIVE", this.$store.getters.keys[0])
      }
    },
    //删除树形结点
    delTreeNode() {
      const current = this.treeNode.dataRef
      switch (current.level) {
        case 1:
          componentApi.del(current.id)
            .then((res) => {
              if (res.code === 200) {
                this.$message.success(res.msg, 0.7)
                this.getTree()
              }
              else {
                this.$message.error("删除失败", 0.7)
              }
            })
            .catch((err) => {
              console.error(err)
            })
          break
        case 2:
          classApi.del(current.id)
            .then((res) => {
              if (res.code === 200) {
                this.$message.success(res.msg, 0.7)
                this.getTree()
              }
              else {
                this.$message.error("删除失败", 0.7)
              }
            })
            .catch((err) => {
              console.error(err)
            })
          break
        case 3:
          methodApi.del({ id: current.id, name: current.name })
            .then((res) => {
              if (res.code === 200) {
                this.$message.success(res.msg, 0.7)
                this.getTree()
              }
              else {
                this.$message.error("删除失败", 0.7)
              }
            })
            .catch((err) => {
              console.error(err)
            })
          break
        case 4:
          methodApi.delOverload(current.id)
            .then((res) => {
              if (res) {
                this.$message.success(res.msg, 0.7)
                this.getTree()
              }
              else {
                this.$message.error(res.msg, 0.7)
              }
            })
            .catch((err) => {
              console.error(err)
            })
          break
      }
    },

    // 取消操作
    cancel() {
      // console.log(e);
      this.$message.info('取消删除', 0.5)
    },
    closeComponent() {
      this.componentVisible = false
      this.componentVisible1 = false
      this.$refs['componentForm'].resetFields()
    },
    closeClass() {
      this.classtVisible = false
      this.classtVisible1 = false
      this.$refs['classForm'].resetFields()
    },
    closeMethod() {
      this.methodVisible = false
      this.methodVisible1 = false
      this.$refs['methodForm'].resetFields()
    },
    closeOverload() {
      this.overloadVisible = false
      this.overloadVisible1 = false
      this.$refs['overloadForm'].resetFields()
    },
    beforeUnloadHandler(e) {
      e.returnValue = "" // 此处返回任意字符串，不返回null即可，不能修改默认提示内容
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    // console.log("TreeData", this.treeData)
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
.ant-btn {
  margin-bottom: 0px;
  border: 0px;
  /* background: none; */
  height: 20px;
  width: 15px;
  color: rgb(89, 89, 89);
}
.ant-form-item-control {
  line-height: 20px;
}
</style>