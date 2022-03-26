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
              :inline-collapsed="collapsed">
        <a-sub-menu key="sub1">
          <span slot="title">
            <a-icon type="laptop" />
            <span>系统组件</span>
          </span>
          <DirectoryTree :treeData="treeData1"></DirectoryTree>
        </a-sub-menu>
        <a-sub-menu key="sub2">
          <span slot="title">
            <a-icon type="user" />
            <span>用户组件</span>
          </span>
          <DirectoryTree :delDis="true"
                         :treeData="treeData2"></DirectoryTree>
        </a-sub-menu>
      </a-menu>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import DirectoryTree from "./DirectoryTree"

export default {
  name: 'Slider',
  //import引入的组件需要注入到对象中才能使用
  components: {
    DirectoryTree
  },
  data() {
    //这里存放数据
    return {
      collapsed: false,
      openKeys: [],//已展开的侧边栏项

      //测试
      treeData1: [
        {
          title: '组件xxx',
          key: '0-0',
          editStatus: 0,
          level: 1,//所在层数
          children: [
            {
              title: '类1',
              key: '0-0-0',
              editStatus: 0,
              level: 2,
              children: [
                { title: '方法1', key: '0-0-0-0', editStatus: 0, level: 3 },
                { title: '方法2', key: '0-0-0-1', editStatus: 0, level: 3 },
                { title: '方法3', key: '0-0-0-2', editStatus: 0, level: 3 },
              ],
            },
            {
              title: '类2',
              key: '0-0-1',
              editStatus: 0,
              level: 2,
              children: [
                { title: '方法1', key: '0-0-1-0', editStatus: 0, level: 3 },
                { title: '方法2', key: '0-0-1-1', editStatus: 0, level: 3 },
                { title: '方法3', key: '0-0-1-2', editStatus: 0, level: 3 },
              ],
            },
          ],
        },
      ],
      treeData2: [
        {
          title: '组件xxx',
          key: '1-0',
          editStatus: 0,
          level: 1,//所在层数
          children: [
            {
              title: '类1',
              key: '1-0-0',
              editStatus: 0,
              level: 2,
              children: [
                { title: '方法1', key: '1-0-0-0', editStatus: 0, level: 3 },
                { title: '方法2', key: '1-0-0-1', editStatus: 0, level: 3 },
                { title: '方法3', key: '1-0-0-2', editStatus: 0, level: 3 },
              ],
            },
          ],
        },
      ],
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    //改变侧边栏收缩状态
    sliderCollapsed() {
      this.collapsed = !this.collapsed
      this.$store.commit('SET_COLLAPSED', this.collapsed)
    },
    //清空展开状态
    allCollapsed() {
      this.openKeys = []
      this.$store.commit('SET_CLOSE_CLEAR')
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {

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