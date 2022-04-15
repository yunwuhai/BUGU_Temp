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
          <DirectoryTree :treeData="$store.getters.systemTree"></DirectoryTree>
        </a-sub-menu>
        <a-sub-menu key="sub2">
          <span slot="title">
            <a-icon type="user" />
            <span>用户组件</span>
          </span>
          <DirectoryTree :delDis="true"
                         :treeData="$store.getters.userTree"></DirectoryTree>
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
import treeApi from '@/api/tree'

export default {
  name: 'Slider',
  //import引入的组件需要注入到对象中才能使用
  components: {
    DirectoryTree,
  },
  data() {
    //这里存放数据
    return {
      id: sessionStorage.getItem('projectId'),
      // projectName: "未定义项目",
      collapsed: false,
      openKeys: ['sub1', 'sub2'],//已展开的侧边栏项
      // project: {},
      // projectName: "",
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
      treeApi.getTree(1, 0)
        .then((res) => {
          // this.systemTree = res.data
          this.$store.commit('SET_SYSTEMTREE', res.data)
        })
        .catch((err) => {
          this.$message.error("系统组件获取失败", 0.7)
          console.error(err)
        })

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

    //改变侧边栏收缩状态
    sliderCollapsed() {
      this.collapsed = !this.collapsed
      this.$store.commit('SET_COLLAPSED', this.collapsed)
    },
    //清空展开状态
    allCollapsed() {
      this.openKeys = []
      this.$bus.$emit('clear', [])
    },

  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    // console.log(this.$store.getters.userTree)
    // console.log(this.$store.getters.systemTree)
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.getTree()
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