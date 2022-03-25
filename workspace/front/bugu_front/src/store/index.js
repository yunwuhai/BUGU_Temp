import Vue from "vue";
import Vuex from "vuex";
import slider from "./modules/slider.js"
import content from "./modules/content.js"
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  mutations: {},
  actions: {},
  modules: {
    slider,
    content
  },
});
