<!-- 顶栏组件 -->
<template>
  <a-layout-header class="header">
    <Logout></Logout>
    <div class="user">
      <a-avatar style="backgroundColor:rgb(24,144,255,0.3);"
                icon="user" />
      <span style="margin-left:10px">{{name}},欢迎登陆！</span>
    </div>
    <div class="logo">
      <!-- <router-link to="/entrance"> -->
      <img src="@/assets/LOGO.png"
           alt="logo"
           width="200px"
           height="64px" />
      <!-- </router-link> -->
    </div>
    <div style="margin-left: 13.7vw;">
      <a-menu theme="dark"
              mode="horizontal"
              :selectable="false"
              style="lineHeight:64px">
        <a-menu-item key="1">
          <router-link to="/project">项目界面</router-link>
        </a-menu-item>
        <!-- <a-menu-item key="2"> 社区界面 </a-menu-item> -->
        <a-menu-item key="3">
          <router-link to="/usercenter">个人中心</router-link>
        </a-menu-item>
      </a-menu>
    </div>
  </a-layout-header>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { getUserInfo } from '@/utils/token'

export default {
  name: 'Header',
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      name: getUserInfo().nickName
    };
  },
  //监听属性 类似于data概念
  computed: {
  },
  //监控data中的数据变化
  watch: {
    name(oldV, newV) {
      console.log(oldV, newV)
    }
  },
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
.logo {
  position: absolute;
  /* height: 53px;
  width: 2px; */
}
.user {
  float: right;
  margin-right: 10px;
  color: aliceblue;
}
</style>