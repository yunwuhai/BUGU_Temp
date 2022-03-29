import Vue from "vue";
import Vuex from "vuex";
// import state from "./state"
// import actions from "./actions"
// import mutations from "./mutations"
// import getters from "./getters"
import slider from "./modules/slider.js"
import content from "./modules/content.js"
import user from "./modules/user.js"
Vue.use(Vuex);

export default new Vuex.Store({
  // state,
  // actions,
  // mutations,
  // getters,
  modules: {
    slider,
    content,
    user
  },
});
