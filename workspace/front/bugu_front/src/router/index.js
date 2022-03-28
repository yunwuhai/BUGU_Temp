import Vue from "vue";
import VueRouter from "vue-router";
import ProjectLayout from "../views/project/Layout"
import Entrance from "../views/entrance/Entrance"
Vue.use(VueRouter);

const routes = [
  {
    path:'/',
    redirect:'/entrance'
  },
  {
    path: '/project',
    name: 'Project',
    component: ProjectLayout,
  },
  {
    path: '/entrance',
    name: 'Entrance',
    component: Entrance,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
