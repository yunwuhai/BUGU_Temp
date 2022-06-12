import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters"
import slider from "./modules/slider.js"
import content from "./modules/content.js"
import user from "./modules/user.js"
import router from "./modules/router.js"
import data from "./modules/data.js"
import card from "./modules/card.js"

Vue.use(Vuex);

export default new Vuex.Store({
  // state,
  // actions,
  // mutations,
  getters,
  modules: {
    slider,
    content,
    user,
    router,
    data,
    card
  },
});
