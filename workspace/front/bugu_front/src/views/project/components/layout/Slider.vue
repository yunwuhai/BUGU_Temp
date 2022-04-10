<!-- 侧边栏组件 -->
<template>
  <div>
    <a-tooltip placement="top"
               title="收起菜单栏">
      <a-button type="link"
                @click="sliderCollapsed">
        <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" />
      </a-button>
    </a-tooltip>
    <a-tooltip placement="left"
               title="全部折叠">
      <a-button type="link"
                @click="allCollapsed">
        <a-icon type="switcher" />
      </a-button>
    </a-tooltip>
    <div class="slider">
      <a-menu mode="inline"
              :openKeys.sync="openKeys"
              :default-selected-keys="['1']"
              :inline-collapsed="collapsed">
        <a-menu-item key="1">
          <a-icon type="project" />
          <span>{{$store.getters.project.name}}</span>
        </a-menu-item>
        <a-sub-menu key="sub1">
          <span slot="title">
            <a-icon type="laptop" />
            <span>系统组件</span>
          </span>
          <DirectoryTree :treeData="systemTree"></DirectoryTree>
        </a-sub-menu>
        <a-sub-menu key="sub2">
          <span slot="title">
            <a-icon type="user" />
            <span>用户组件</span>
          </span>
          <DirectoryTree :delDis="true"
                         :treeData="userTree"></DirectoryTree>
        </a-sub-menu>
      </a-menu>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import DirectoryTree from "./DirectoryTree"
import { getUserInfo } from "@/utils/token"
export default {
  name: 'Slider',
  //import引入的组件需要注入到对象中才能使用
  components: {
    DirectoryTree,
  },
  data() {
    //这里存放数据
    return {
      // projectName: "未定义项目",
      collapsed: false,
      openKeys: ['sub1', 'sub2'],//已展开的侧边栏项

      //测试
      treeData1: [
        {
          title: '组件xxx',
          key: '0-0',
          type: "2",
          author: "BUGU",
          level: 1,//所在层数
          description: "组件：xxxx",//简介
          children: [
            {
              title: '类1',
              key: '0-0-0',
              author: "BUGU",
              type: "2",
              level: 2,
              description: "类：xxxx",//简介
              children: [
                {
                  title: '数据对象',
                  key: 'o-0-0-0',
                  type: "4",
                  author: "BUGU",
                  level: 3,
                  description: "xxx类的数据对象",
                },
                {
                  title: '构造函数',
                  author: "BUGU",
                  key: 'c-0-0-0',
                  type: "3",
                  level: 3,
                  description: "xxx类的构造函数",
                },
                {
                  title: '方法1',
                  key: '0-0-0-0',
                  author: "BUGU",
                  type: "2",
                  level: 3,
                  description: "方法：xxxx",
                  children: [
                    { title: '重载1', key: '0-0-0-0-0', author: "BUGU", level: 4, type: "2", description: "重载：xxxx" },
                    { title: '重载2', key: '0-0-0-0-1', author: "BUGU", level: 4, type: "2", description: "重载：xxxx" },
                    { title: '重载3', key: '0-0-0-0-2', author: "BUGU", level: 4, type: "2", description: "重载：xxxx" },
                  ],
                },
                {
                  title: '方法2',
                  key: '0-0-0-1',
                  author: "BUGU",
                  type: "2",
                  level: 3,
                  description: "方法：xxxx",
                  children: [
                    { title: '重载1', key: '0-0-0-1-0', author: "BUGU", level: 4, type: "2", description: "重载：xxxx" },
                    { title: '重载2', key: '0-0-0-1-1', author: "BUGU", level: 4, type: "2", description: "重载：xxxx" },
                    { title: '重载3', key: '0-0-0-1-2', author: "BUGU", level: 4, type: "2", description: "重载：xxxx" },
                  ],
                },
                {
                  title: '方法3',
                  key: '0-0-0-2',
                  type: "2",
                  author: "BUGU",
                  level: 3,
                  description: "方法：xxxx"
                },
              ],
            },
          ],
        },
      ],

      userTree: [],//用户组件
      systemTree: []//系统组件
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    getTree() {
      /* 
        向后端请求系统已有的组件目录树
      */
      this.systemTree = this.treeData1
      let author = getUserInfo().nickName
      // 工程项目
      if (this.$store.getters.project.type === "0") {
        let componentKey = `${this.$store.getters.project.id}_` + this.$store.getters.project.componentId.length
        this.$store.getters.project.componentId.push(componentKey)

        this.userTree.push({
          title: '核心组件',
          key: componentKey,
          author: author,
          type: "0",
          level: 1,//所在层数
          description: "MAIN：核心组件",//简介
          children: [{
            title: '核心类',
            key: componentKey + "_0",
            author: author,
            type: "0",
            level: 2,//所在层数
            description: "main：核心类",
            children: [
              {
                title: '核心数据',
                key: componentKey + '0',
                type: "4",
                author: author,
                level: 3,
                description: "核心类的属性",
              },
              {
                title: '核心方法',
                key: componentKey + "_0_0",
                author: author,
                type: "0",
                level: 3,//所在层数
                description: "main方法：核心方法",//简介
                children: [{
                  title: 'main',
                  key: componentKey + "_0_0_0",
                  type: "0",
                  author: author,
                  level: 4,//所在层数
                  description: "执行入口",//简介
                }]
              }]
          }]
        })
      } else {
        let componentKey = "u" + this.$store.getters.project.id
        this.userTree.push({
          title: this.$store.getters.project.name,//组件名
          key: componentKey,//id
          author: author,
          level: 1,//所在层数
          description: "组件：xxxx",//简介
          children: [
            {
              title: this.$store.getters.project.name + "类",
              key: componentKey + "_1",
              author: author,
              level: 2,
              description: "类：xxxx",//简介
              children: [
                {
                  title: '创建对象',
                  key: 'o' + componentKey,
                  author: author,
                  level: 3,
                  description: "xxx类的对象",
                },
                {
                  title: '构造方法',
                  key: 'c' + componentKey,
                  author: author,
                  level: 3,
                  description: "xxx类的构造方法",
                  children: [
                    { title: '构造方法1', key: 'c' + componentKey + '_1', level: 4, description: "构造函数1" },
                  ],
                },
                {
                  title: this.$store.getters.project.name + '方法',
                  key: componentKey + '_1_1',
                  author: author,
                  level: 3,
                  description: "方法：xxxx",
                  children: [
                    { title: '重载1', key: componentKey + '_1_1', author: author, level: 4, description: "重载：xxxx" },
                    { title: '重载2', key: componentKey + '_1_2', author: author, level: 4, description: "重载：xxxx" },
                    { title: '重载3', key: componentKey + '_1_3', author: author, level: 4, description: "重载：xxxx" },
                  ],
                },
              ],
            },
          ],
        })
      }
    },
    //改变侧边栏收缩状态
    sliderCollapsed() {
      this.collapsed = !this.collapsed
      this.$store.commit('SET_COLLAPSED', this.collapsed)
    },
    //清空展开状态
    allCollapsed() {
      this.openKeys = []
      this.$bus.$emit('clear', [])
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getTree()
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
.slider {
  background: rgb(240, 242, 245);
  width: 15vw;
  /* height: calc(84vh + 40px); */
  height: 83.3vh;
  overflow-y: auto;
  overflow-x: hidden;
}
.ant-btn {
  margin-bottom: 0px;
  border: 0px;
  /* background: none; */
  height: 40px;
  color: rgb(89, 89, 89);
}
</style>