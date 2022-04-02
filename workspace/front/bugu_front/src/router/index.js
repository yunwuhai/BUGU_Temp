import Vue from "vue";
import VueRouter from "vue-router";
// import ProjectLayout from "../views/project/Layout"
// import Entrance from "../views/entrance/Entrance"
// import Admin from "../views/admin/Admin"
Vue.use(VueRouter);


// 解决Vue-Router升级导致的Uncaught(in promise) navigation guard问题
// push
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
 
// replace
const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace= function replace(location) {
  return originalReplace.call(this, location).catch(err => err)
}

export const constRoutes = [
  {
    path:'/',
    redirect:'/entrance'
  },
  {
    path: '/404',
    name:'404',
    component:() => import('@/views/error/404'),
  },
  {
    path: '/entrance',
    name: 'Entrance',
    component: () => import('@/views/entrance/Entrance'),
  },
]
export const asyncRoutes=[
  {
    path: '/project',
    name: 'Project',
    //路由的懒加载
    component: () => import('@/views/project/Layout'),
    meta:{
      role:1
    }
  },
  {
    path:'/admin',
    name:'Admin',
    component:() => import('@/views/admin/Admin'),
    meta:{
      role:2
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes:constRoutes,
});

export default router;
