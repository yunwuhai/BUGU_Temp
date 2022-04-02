<!-- 侧边栏的目录树 -->
<template>
  <div>
    <a-tree style="padding-left:20px;"
            showIcon
            showLine
            :selectable="false"
            :treeData="treeData"
            :disabled="treeUse"
            :expandedKeys.sync="expandedKeys"
            onselectstart="return false;"
            @rightClick="onEventTreeNode">

      <!-- 下拉菜单被渲染进每一个树节点 -->
      <template #title="nodeData">
        <a-dropdown :trigger="['contextmenu']">
          <span @dblclick.stop="openTab(nodeData)"
                v-if="!nodeData.dataRef.editStatus">
            <a-tooltip placement="right"
                       :title="nodeData.dataRef.description">
              {{ nodeData.dataRef.title }}
            </a-tooltip>
          </span>

          <a-input v-if="nodeData.dataRef.editStatus === 1"
                   style="line-height:24px;"
                   size="small"
                   ref="create"
                   placeholder="请输入内容"
                   v-model="nodeData.dataRef.title"
                   @pressEnter="saveCreate(treeData,nodeData.dataRef.key,nodeData.dataRef.title)" />
          <a-input v-if="nodeData.dataRef.editStatus === 2"
                   size="small"
                   ref="edit"
                   placeholder="请输入内容"
                   v-model="nodeData.dataRef.title"
                   @pressEnter="saveEdit()" />

          <template #overlay>
            <a-menu v-if="!treeUse&&delDis&&!object">
              <a-menu-item key="1"
                           @click="addSame()">
                <a-icon type="plus-circle" />新建同级
              </a-menu-item>
              <a-menu-item key="2"
                           @click="addNext()">
                <a-icon type="plus" />新建下级
              </a-menu-item>
              <a-menu-item key="3"
                           @click="edit()">
                <a-icon type="edit" />重命名
              </a-menu-item>
              <a-menu-item key="4">
                <a-popconfirm title="确定删除吗？"
                              placement="topLeft"
                              @cancel="cancel"
                              @confirm="del()">
                  <a-icon type="delete" />删除
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </template>
    </a-tree>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

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
    // const 
    return {
      editStatus: 0,//0-展示文字 1-新建 2-修改
      treeUse: false,//是否禁用整个树形控件
      object: false,
      title: "",

      //后端返回 
      // treeData: [
      //   {
      //     title: '组件xxx',
      //     key: '0-0',
      //     editStatus: 0,
      //     level: 1,//所在层数
      //     children: [
      //       {
      //         title: '类1',
      //         key: '0-0-0',
      //         editStatus: 0,
      //         level: 2,
      //         children: [
      //           { title: '方法1', key: '0-0-0-0', editStatus: 0, level: 3 },
      //           { title: '方法2', key: '0-0-0-1', editStatus: 0, level: 3 },
      //           { title: '方法3', key: '0-0-0-2', editStatus: 0, level: 3 },
      //         ],
      //       },
      //       {
      //         title: '类2',
      //         key: '0-0-1',
      //         editStatus: 0,
      //         level: 2,
      //         children: [
      //           { title: '方法1', key: '0-0-1-0', editStatus: 0, level: 3 },
      //           { title: '方法2', key: '0-0-1-1', editStatus: 0, level: 3 },
      //           { title: '方法3', key: '0-0-1-2', editStatus: 0, level: 3 },
      //         ],
      //       },
      //     ],
      //   },
      // ],
      treeNode: {},
      expandedKeys: [],
    };
  },
  components: {},
  //监听属性 类似于data概念
  computed: {
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    //全局事件总线 绑定的自定义函数
    clearExpand(clear) {
      this.expandedKeys = clear
    },
    //根据名字查找父级结点
    // getParentNode(data, nodeId, arrRes) {
    //   if (!data) {
    //     if (!nodeId) {
    //       arrRes.unshift(nodeId);
    //     }
    //     return arrRes;
    //   }
    //   for (var i = 0, length = data.length; i < length; i++) {
    //     let node = data[i];
    //     if (node.value == nodeId) {
    //       arrRes.unshift(nodeId);
    //       // console.log(arrData);
    //       this.getParentNode(arrData, node.City, arrRes);
    //       break;
    //     }
    //     else {
    //       if (node.children) {
    //         this.getParentNode(node.children, nodeId, arrRes);
    //       }
    //     }
    //   }
    //   return arrRes;
    // },
    //双击在右侧打开选项卡
    openTab(node) {
      let nodeData = node.dataRef
      // console.log(node)

      const data = [{
        key: 111,
        name: "wpowww",
        age: 3,
        address: "swuswu",
      }]

      if (nodeData.level < 4) {
        if (nodeData.key.indexOf('o') !== -1) {
          // if (!this.$store.getters.visible) {
          this.$message.success('进入对象编辑', 0.5);
          this.$store.commit('SET_TITLE', nodeData.title + "数据仓库")
          this.$store.commit('SET_VISIBLE', true)
          this.$store.commit('SET_PLACEMENT', 'bottom')
          this.$store.commit('SET_WRAP', { marginLeft: '17.6%', width: '82.4%' })
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
          this.$message.success('成功打开选项卡', 0.5);
          this.$store.commit("SET_KEYS", nodeData.key)
          this.$store.commit("SET_ACTIVE", nodeData.key)
          this.$store.commit("SET_PANES", { title: nodeData.title, content: "", key: nodeData.key })
        } else {
          this.$store.commit("SET_ACTIVE", nodeData.key)
          this.$message.info(nodeData.title + '已打开', 0.5);
        }
      }
    },
    // 右键点击树形结点时
    onEventTreeNode(e) {
      if (this.treeUse) {
        return
      }
      //获取当前结点信息
      // console.log("当前的结点信息改变")
      this.treeNode = e.node
      this.object = (this.treeNode.dataRef.key.indexOf('o') !== -1)
      // console.log(this.treeNode)

    },
    //新建同级树形结点
    addSame() {
      this.treeUse = true
      // this.treeNode.dataRef.disabled = false
      // 查找父级数据
      let parentData = this.treeNode.$parent.dataRef
      let newTreeNode = {
        title: "",
        key: new Date().getTime(),
        editStatus: 1,
        level: this.treeNode.dataRef.level
      }
      if (parentData) {
        if (!parentData.children) {
          this.$set(parentData, 'children', [])
        }
        parentData.children.push({
          title: "",
          key: new Date().getTime(),
          editStatus: 1,
          level: this.treeNode.dataRef.level
        })
        // console.log(this.treeData)
      } else {
        this.treeData.push(newTreeNode)
      }
      // console.log(this.treeData)
      this.$nextTick(() => {
        // 调用refs
        this.$refs.create.focus()
      });
    },
    //新建下一级树形结点
    addNext() {
      if (this.treeNode.dataRef.level < 4) {
        this.treeUse = true
        let dataRef = this.treeNode.dataRef
        this.expandedKeys.push(dataRef.key)
        this.$nextTick(() => {
          // 调用refs
          this.$refs.create.focus()
        });
        if (!dataRef.children) {
          this.$set(dataRef, 'children', [])
        }
        dataRef.children.push({
          title: "",
          key: new Date().getTime(),
          editStatus: 1,
          level: dataRef.level + 1
        })
        // console.log(this.treeData)
      } else {
        this.$message.error('方法不能再新建下一级', 0.5);
      }
    },
    //保存新建的树形结点
    saveCreate(treeData, key, title) {
      if (title) {
        treeData.find((item) => {
          if (item.key === key) {
            this.$message.success('成功创建', 0.5);
            //向后端发送
            /*
            
            
            */
            item.editStatus = 0
            this.treeUse = false
            return true
          }
          else if (item.children) {
            if (item.children.length)
              // console.log(111)
              this.saveCreate(item.children, key, title)
          } else {
            return false
          }
        });
      } else {
        this.$message.warning('请输入内容！', 0.5);
      }

    },
    //编辑树形结点
    edit() {
      this.treeNode.dataRef.editStatus = 2
      this.treeUse = true
      this.treeNode.dataRef.disabled = false
      //自动获取焦点
      this.$nextTick(() => {
        // 调用refs
        this.$refs.edit.focus()
      });
    },
    //保存修改
    saveEdit() {
      if (this.treeNode.dataRef.title) {
        this.treeNode.dataRef.editStatus = 0
        delete this.treeNode.dataRef.disabled
        this.treeUse = false
        //修改方法名时更新选项卡名称
        if (this.treeNode.dataRef.level === 4) {
          this.$store.commit("UPDATE_PANES_TITLE", { key: this.treeNode.dataRef.key, title: this.treeNode.dataRef.title })
        }
        this.$message.success('成功修改', 0.5);
      } else {
        this.$message.warning('请输入内容！', 0.5);
      }
      // console.log(this.treeData)
      //给后端发送更新请求
      //向后端发送
      /*
      
      
      */
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
    del() {
      let parentDataRef = this.treeNode.$parent.dataRef
      const currentDataRef = this.treeNode.dataRef
      // 判断是否是顶层
      //有父节点数据-不是顶层
      if (parentDataRef) {
        const children = parentDataRef.children
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
      // console.log(this.treeData)
    },
    cancel() {
      // console.log(e);
      this.$message.info('取消删除', 0.5);
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    //全局事件总线
    this.$bus.$on('clear', this.clearExpand)
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