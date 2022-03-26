import Vue from "vue";
import App from "./App.vue";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import '@/styles/global.css' // 全局样式
import Animated from 'animate.css'
import router from "./router";
import store from "./store";


Vue.config.productionTip = false;
Vue.use(Antd);
Vue.use(Animated)

new Vue({
  router,
  store,
  render: (h) => h(App),
  beforeCreate(){
    Vue.prototype.$bus = this//安装全局事件总线
  }
}).$mount("#app");
