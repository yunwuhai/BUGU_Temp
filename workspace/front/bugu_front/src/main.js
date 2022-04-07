import Vue from "vue";
import App from "./App.vue";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import '@/styles/global.css' // 全局样式
import 'nprogress/nprogress.css'// 引入进度条样式
import Animated from 'animate.css'
import router from "./router";
import store from "./store";
import './icons/index.js' //引入svg
import './utils/permission' // 路由守卫
import Components from '@/components/index'//全局组件


Vue.config.productionTip = false;
Vue.use(Antd);
Vue.use(Animated)
Vue.use(Components)// 全局组件

new Vue({
  router,
  store,
  render: (h) => h(App),
  beforeCreate(){
    Vue.prototype.$bus = this//安装全局事件总线
  }
}).$mount("#app");
