<!-- 侧边栏组件 -->
<template>
  <!-- :style="{ background: '#fff', height: '80vh', position: 'fixed'}" -->
  <a-layout-sider width="15vw"
                  v-model="collapsed"
                  style="background: #fff">
    <a-menu mode="inline"
            :default-selected-keys="['1']"
            :default-open-keys="['sub1']"
            :style="{ height: '100%', borderRight: 0 }">
      <a-sub-menu key="sub1">
        <span slot="title">
          <a-icon type="user" />subnav 1
        </span>
        <a-menu-item key="1"> option1 </a-menu-item>
        <a-menu-item key="2"> option2 </a-menu-item>
        <a-menu-item key="3"> option3 </a-menu-item>
        <a-menu-item key="4"> option4 </a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub2">
        <span slot="title">
          <a-icon type="laptop" />subnav 2
        </span>
        <a-menu-item key="5"> option5 </a-menu-item>
        <a-menu-item key="6"> option6 </a-menu-item>
        <a-menu-item key="7"> option7 </a-menu-item>
        <a-menu-item key="8"> option8 </a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub3">
        <span slot="title">
          <a-icon type="notification" />subnav 3
        </span>
        <a-menu-item key="9"> option9 </a-menu-item>
        <a-menu-item key="10"> option10 </a-menu-item>
        <a-menu-item key="11"> option11 </a-menu-item>
        <a-menu-item key="12"> option12 </a-menu-item>
      </a-sub-menu>
    </a-menu>
  </a-layout-sider>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  name: 'Slider',
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      collapsed: false,
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {

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
</style>