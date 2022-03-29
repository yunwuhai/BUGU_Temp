import Vue from "vue";
import VueRouter from "vue-router";
// import ProjectLayout from "../views/project/Layout"
// import Entrance from "../views/entrance/Entrance"
// import Admin from "../views/admin/Admin"
Vue.use(VueRouter);

const routes = [
  {
    path:'/',
    redirect:'/entrance'
  },
  {
    path: '/project',
    name: 'Project',
    //路由的懒加载
    component: () => import('@/views/project/Layout'),
  },
  {
    path: '/entrance',
    name: 'Entrance',
    component: () => import('@/views/entrance/Entrance'),
  },
  {
    path:'/admin',
    name:'Admin',
    component:() => import('@/views/admin/Admin'),
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
