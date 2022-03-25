import Vue from "vue";
import VueRouter from "vue-router";
import ProjectLayout from "../views/project/Layout"
import Login from "../views/login/Login"
import Register from "../views/login/Login"

Vue.use(VueRouter);

const routes = [
  {
    path:'/',
    redirect:'/project'
  },
  {
    path: '/project',
    name: 'Project',
    component: ProjectLayout,
    meta:{
      index:8
    }
      // children: [
      //   {
      //     path: '/project/card',
      //     component: () => import('@/views/project/components/Card'),
      //   },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta:{
      index:9
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
