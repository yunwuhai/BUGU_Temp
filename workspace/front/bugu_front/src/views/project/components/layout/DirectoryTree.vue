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
            <a-menu v-if="delDis && (nodeData.dataRef.type !== '4' ) && (nodeData.dataRef.level < 4)">
              <a-menu-item key="1"
                           :disabled="(nodeData.dataRef.type === '0')&&(nodeData.dataRef.level>1) "
                           v-if="$store.getters.project.type !=='1'"
                           @click="addSame(nodeData.dataRef.level)">
                <a-icon type="plus-circle" />
                <span v-if="nodeData.dataRef.level===1">新建组件</span>
                <span v-else-if="nodeData.dataRef.level===2">新建类</span>
                <span v-else-if="nodeData.dataRef.level===3">新建方法</span>
                <!-- <span v-else-if="nodeData.dataRef.level===4">新建重载</span> -->
              </a-menu-item>
              <a-menu-item key="2"
                           v-if="(nodeData.dataRef.type !== '0') &&(nodeData.dataRef.level !== 4)"
                           @click="addNext(nodeData.dataRef.level)">
                <a-icon type="plus" />
                <span v-if="nodeData.dataRef.level===1">新建类</span>
                <span v-else-if="nodeData.dataRef.level===2">新建方法</span>
                <span v-else-if="nodeData.dataRef.level===3 && nodeData.dataRef.type !== '2'">新建重载</span>
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
              是
            </a-radio>
            <a-radio value="1">
              否
            </a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item has-feedback
                           label="选择父类："
                           prop="parent">
          <a-select v-model="classForm.parent"
                    ref="parent"
                    allowClear
                    autocomplete="off">
            <!-- v-for -->
            <a-select-option value="0">
              基类
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item has-feedback
                           label="选择芯片："
                           prop="chip">
          <a-select v-model="classForm.chip"
                    ref="chip"
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
              是
            </a-radio>
            <a-radio value="1">
              否
            </a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item has-feedback
                           label="选择父类："
                           prop="parent">
          <a-select v-model="classForm.parent"
                    ref="parent"
                    allowClear
                    autocomplete="off">
            <!-- v-for -->
            <a-select-option value="0">
              基类
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item has-feedback
                           label="选择芯片："
                           prop="chip">
          <a-select v-model="classForm.chip"
                    ref="chip"
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
                   ref="name"
                   :autoFocus="true"
                   type="text"
                   allowClear
                   autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item label="重载英文名："
                           prop="token">
          <a-input v-model="overloadForm.token"
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
                   ref="name"
                   :autoFocus="true"
                   type="text"
                   allowClear
                   autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item label="重载英文名："
                           prop="token">
          <a-input v-model="overloadForm.token"
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
      author: getUserInfo().name,
      object: false,//是否是属性编辑选项
      main: false,//是否是核心
      layout: {
        labelCol: { span: 5 },
        wrapperCol: { span: 19 },
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
        parent: "0",//父类 可设置默认值
        chip: "0",//移植芯片
        description: "",//简介
        attrsId: [],//属性库的ID
        methodsId: []//方法库的ID
      },
      classRules: {
        name: [{ required: true, message: '请输入类名', trigger: 'change' }],
        parent: [{ required: true, message: '请选择父类', trigger: 'change' }],
        extend: [{ required: true, message: '请选择是否可继承', trigger: 'change' }],
        chip: [{ required: true, message: '请选择移植芯片', trigger: 'change' }],
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

      //后端返回
      classes: [{
        id: "0-1-0",
        name: "类1",
        extend: false,
        chip: "mumu",
        description: "类：xxxx",//简介
        attrsId: ["o-0-1-0"],//属性库的ID
        methodsId: ["c-0-1-0"]//方法库的ID
      },
      {
        id: "0-1-1",
        name: "类2",
        extend: false,
        chip: "mumu",
        description: "类：xxxx",//简介
        attrsId: ["o-0-1-1"],//属性库的ID
        methodsId: ["c-0-1-1"]//方法库的ID
      },],
      methods: [{
        id: "c-0-1-0",
      }],
      treeNode: {},
      // 查找父级数据
      parentData: {},
      newTreeNode: {},
      expandedKeys: [],
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

      const data = [{
        key: "111",
        name: "整数",
        token: "a",
        type1: "常量",
        type2: "整型",
        value: "5",
        description: "普通整数",
      }]

      if (nodeData.level < 4) {
        if (nodeData.type === "4") {
          // if (!this.$store.getters.visible) {
          this.$message.success('进入对象编辑', 0.5);
          this.$store.commit('SET_TITLE', nodeData.title + "数据仓库")
          this.$store.commit('SET_VISIBLE', true)
          this.$store.commit('SET_PLACEMENT', 'bottom')
          this.$store.commit('SET_WRAP', { marginLeft: '17.6%', width: '81%' })
          this.$store.commit('SET_TABLEDATA', data)
          // } else {
          //   this.$message.info(nodeData.title + '已打开', 0.5);
          // }
        } else {
          this.$message.error('不能开启选项卡', 0.5);
        }
      } else {
        //不能重复打开选项卡
        if (this.$store.getters.keys.indexOf(nodeData.key) === -1) {
          console.log(nodeData.key)
          this.$message.success('成功打开选项卡', 0.5);
          this.$store.commit("SET_KEYS", nodeData.key)
          this.$store.commit("SET_ACTIVE", nodeData.key)
          this.$store.dispatch("getDesData", { title: nodeData.title, key: nodeData.key })
        } else {
          this.$store.commit("SET_ACTIVE", nodeData.key)
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

    //新建同级还是下一级
    addTree(edit) {
      switch (edit) {
        case 'same': this.addSameTree()
          break
        case 'next': this.addNextTree()
          break
      }
    },
    //树形控件-新建同级结点
    addSameTree() {
      if (this.parentData) {
        if (!this.parentData.children) {
          this.$set(this.parentData, 'children', [])
        }
        this.parentData.children.push(this.newTreeNode)
      } else {
        this.treeData.push(this.newTreeNode)
      }
      /* 
        向后端发送更新树形控件的请求 
      */
      this.$message.success('成功创建', 0.5);
    },
    //树形控件-新建下一级结点
    addNextTree() {
      let dataRef = this.treeNode.dataRef
      this.expandedKeys.push(dataRef.key)

      if (!dataRef.children) {
        this.$set(dataRef, 'children', [])
      }
      dataRef.children.push(this.newTreeNode);
      /* 
        向后端发送更新树形控件的请求 
      */
      this.$message.success('成功创建', 0.5);
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
          this.overloadForm = {}
          break
      }
    },
    //判断编辑的是哪一级
    editTreeNode(level) {
      switch (level) {
        case 1:
          //根据id从后端获取数据
          // this.componentForm = {}
          this.componentVisible1 = true
          this.componentTitle = "修改组件信息"
          break
        case 2:
          // this.classForm = this.classes.filter(item => item.id === this.treeNode.dataRef.key)
          this.classVisible1 = true
          this.classTitle = "修改类信息"
          break
        case 3:
          // this.methodForm = {}
          this.methodVisible1 = true
          this.methodTitle = "修改方法信息"
          break
        case 4:
          // this.overloadForm = {}
          this.overloadVisible1 = true
          this.overloadTitle = "修改重载信息"
          break
      }
    },

    // 保存新建
    saveComponentAddSame(formName) {
      // this.treeNode.dataRef.disabled = false
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 从对话框中获取 
          this.newTreeNode = {
            title: this.componentForm.name,
            key: new Date().getTime() + '1',
            type: "2",
            author: this.author,
            level: this.editStatus == 'same' ? this.treeNode.dataRef.level : this.treeNode.dataRef.level + 1,
            description: this.componentForm.description
          }
          /*
            后端接口 提交componentForm
          */

          // 修改树形结构 新建结点
          this.addTree(this.editStatus)
          this.$message.success('新建成功', 0.5)
          this.componentVisible = false
        } else {
          this.$message.error('新建失败', 0.5)
        }
      })
    },
    saveClassAddSame(formName) {
      // this.treeNode.dataRef.disabled = false
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 从对话框中获取 
          this.newTreeNode = {
            title: this.classForm.name,
            key: new Date().getTime() + '1',
            type: "2",
            author: this.author,
            level: this.editStatus == 'same' ? this.treeNode.dataRef.level : this.treeNode.dataRef.level + 1,
            description: this.classForm.description,
            children: this.editStatus == 'same' ? [] : [
              {
                title: '创建对象',
                key: 'o' + new Date().getTime() + '1',
                level: 3,
                type: "4",
                author: this.author,
                description: "xxx类的对象",
              },
              {
                title: '构造方法',
                key: 'c' + new Date().getTime() + '1',
                type: "3",
                author: this.author,
                level: 3,
                description: "xxx类的构造方法",
              },
            ]
          }
          /*
            后端接口 提交classForm
          */

          // 修改树形结构
          this.addTree(this.editStatus)
          this.$message.success('新建成功', 0.5)
          this.classVisible = false
        } else {
          this.$message.error('新建失败', 0.5)
        }
      })
    },
    saveMethodAddSame(formName) {
      console.log("method")
      this.$refs[formName].validate(valid => {

        if (valid) {
          // 从对话框中获取 
          this.newTreeNode = {
            title: this.methodForm.name,
            key: new Date().getTime() + '1',
            type: "2",
            author: this.author,
            level: this.editStatus == 'same' ? this.treeNode.dataRef.level : this.treeNode.dataRef.level + 1,
            description: this.methodForm.description,
            // children: [{
            //   title: this.methodForm.name,
            //   key: new Date().getTime(),
            //   level: this.treeNode.dataRef.level + 1,
            //   description: this.methodForm.description + "的实现",
            // }]
          }
          /*
            后端接口 提交methodForm
          */

          // 修改树形结构
          this.addTree(this.editStatus)
          this.$message.success('新建成功', 0.5)
          this.methodVisible = false
        } else {
          this.$message.error('新建失败', 0.5)
        }
      })
    },
    saveOverloadAddSame(formName) {
      // this.treeNode.dataRef.disabled = false
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 从对话框中获取 
          this.newTreeNode = {
            title: this.overloadForm.name,
            key: new Date().getTime() + '1',
            type: "2",
            author: this.author,
            level: this.editStatus == 'same' ? this.treeNode.dataRef.level : this.treeNode.dataRef.level + 1,
            description: this.overloadForm.description
          }
          /*
            后端接口 提交componentForm
          */

          // 修改树形结构
          this.addTree(this.editStatus)
          this.$message.success('新建成功', 0.5)
          this.overloadVisible = false
        } else {
          this.$message.error('新建失败', 0.5)
        }
      })
    },

    //保存修改
    saveComponentEdit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          /*
            根据id更新后端数据 更新treeData
          */
          this.$message.success('成功修改', 0.5);
          this.componentVisible = false
        } else {
          this.$message.success('请填写完整', 0.5);
        }
      })
    },
    saveClassEdit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          /*
            根据id更新后端数据 更新treeData
          */
          this.$message.success('成功修改', 0.5);
          this.classVisible = false
        } else {
          this.$message.success('请填写完整', 0.5);
        }
      })
    },
    saveMethodEdit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          /*
            根据id更新后端数据 更新treeData
          */
          this.$message.success('成功修改', 0.5);
          this.methodVisible = false
        } else {
          this.$message.success('请填写完整', 0.5);
        }
      })
    },
    saveOverloadEdit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          /*
            根据id更新后端数据 更新treeData
          */
          //修改方法名时更新选项卡名称
          this.$store.commit("UPDATE_PANES_TITLE", { key: this.treeNode.dataRef.key, title: this.treeNode.dataRef.title })
          this.$message.success('成功修改', 0.5);
          this.overloadVisible = false
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
      const currentDataRef = this.treeNode.dataRef
      // 判断是否是顶层
      //有父节点数据-不是顶层
      if (this.parentData) {
        const children = this.parentData.children
        const index = children.indexOf(currentDataRef)
        children.splice(index, 1)
        this.$message.success('成功删除', 0.5);
        this.removeTabs()
      } else {
        if (this.treeData.length > 1) {
          const index = this.treeData.indexOf(currentDataRef)
          this.treeData.splice(index, 1)
          this.$message.success('成功删除', 0.5)
          this.removeTabs()
        } else {
          this.$message.error('不可全部删除', 0.5)
        }
      }
      /* 
      
      向后端发送
     
      */
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
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    //全局事件总线
    this.$bus.$on('clear', this.clearExpand)
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