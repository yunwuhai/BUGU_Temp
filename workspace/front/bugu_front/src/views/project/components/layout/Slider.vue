<!-- 侧边栏组件 -->
<template>
  <div>
    <!-- 按钮组 -->
    <a-tooltip placement="top"
               title="收起菜单栏">
      <a-button type="link"
                @click="sliderCollapsed">
        <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" />
      </a-button>
    </a-tooltip>
    <a-tooltip placement="top"
               title="全部折叠">
      <a-button type="link"
                @click="allCollapsed">
        <a-icon type="switcher" />
      </a-button>
    </a-tooltip>
    <a-tooltip placement="bottom"
               title="数据仓库">
      <a-button type="link"
                class="data-ant-btn"
                @click="displayData">
        <a-icon type="database" />
      </a-button>
    </a-tooltip>
    <a-tooltip placement="right"
               title="编译项目">
      <a-button type="link"
                @click="compile">
        <a-icon type="save" />
      </a-button>
    </a-tooltip>
    <a-modal v-model="visible"
             :maskClosable="false"
             :width="300"
             :centered="true"
             title="编译项目"
             :footer="null">
      <p>请选择需要下载的文件类型</p>
      <a-button @click="downloadEXE"
                :loading="downloadingE">
        <a-icon type="download" />
        <span>可执行文件</span>
      </a-button>
      <a-button @click="downloadSource"
                :loading="downloadingS"
                style="marginLeft:20px">
        <a-icon type="download" />
        <span>源码文件</span>
      </a-button>
    </a-modal>
    <div class="slider">
      <a-menu mode="inline"
              :openKeys.sync="openKeys"
              :default-selected-keys="['1']"
              :inline-collapsed="collapsed">
        <a-menu-item key="1">
          <a-icon type="project" />
          <span>{{projectName}}</span>
        </a-menu-item>
        <a-sub-menu key="sub1">
          <span slot="title">
            <a-icon type="laptop" />
            <a-tooltip placement="right"
                       title="供用户使用的系统已有组件">
              <span>外部组件</span>
            </a-tooltip>
          </span>
          <DirectoryTree :treeData="$store.getters.systemTree"></DirectoryTree>
        </a-sub-menu>
        <a-sub-menu key="sub2">
          <span slot="title">
            <a-tooltip placement="right"
                       title="用户自定义的组件">
              <a-icon type="user" />
              <span>内部组件</span>
            </a-tooltip>
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
import dataApi from '@/api/data'
import { getUserInfo, getProjectInfo } from "@/utils/token"
import treeApi from '@/api/tree'
import downloadApi from '@/api/download'

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
      projectName: getProjectInfo().name,
      visible: false,
      // projectName: "未定义项目",
      collapsed: false,
      openKeys: ['sub1', 'sub2'],//已展开的侧边栏项
      // project: {},
      // projectName: "",
      userTree: [],//内部组件
      systemTree: [],//外部组件
      downloadingE: false,
      downloadingS: false
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    displayData() {
      /*
      向后端请求 总数据
      */
      this.$store.commit('SET_VISIBLE', !this.$store.getters.visible)
      this.$store.commit('SET_TITLE', "数据对象总仓库")
      this.$store.commit('SET_PLACEMENT', 'right')
      this.$store.commit('SET_WRAP', { marginTop: '64px' })
      this.$store.commit('SET_ADDSTATUS', false)
      dataApi.queryByEngin(getUserInfo().id, this.id)
        .then((res) => {
          if (res.code === 200) {
            this.$store.commit('SET_TABLEDATA', res.data)
          } else {
            this.$store.commit('CLEAR_TABLEDATA')
          }
        })
        .catch((err) => {
          console.error(err)
        })
    },
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
          this.$message.error("外部组件获取失败", 0.7)
          console.error(err)
        })

      treeApi.getTree(+getUserInfo().id, +this.id)
        .then((res) => {
          // this.userTree = res.data
          this.$store.commit('SET_USERTREE', res.data)
        })
        .catch((err) => {
          this.$message.error("内部组件获取失败", 0.7)
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
      this.$bus.$emit('close', [])
    },
    compile() {
      this.visible = true
    },
    downloadEXE() {
      this.downloadingE = true
      downloadApi.downloadEXE(this.id)
      setTimeout(() => {
        this.downloadingE = false
      }, 5000)
    },
    downloadSource() {
      this.downloadingS = true
      downloadApi.downloadSource(this.id)
      setTimeout(() => {
        this.downloadingS = false
      }, 15000)
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getTree()
    // console.log(this.$store.getters.userTree)
    // console.log(this.$store.getters.systemTree)
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