import Vue from "vue";
import VueRouter from "vue-router";
import ProjectLayout from "../views/project/Layout"

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
      // children: [
      //   {
      //     path: '/project/card',
      //     component: () => import('@/views/project/components/Card'),
      //   },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
