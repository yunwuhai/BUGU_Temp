/*
 * @Description: 
 * @version: 1.0.0
 * @Author: WPO
 * @Date: 2022-03-25 22:18:30
 * @LastEditors: WPO
 * @LastEditTime: 2022-04-09 14:20:46
 */
import Vue from "vue";
import VueRouter from "vue-router";

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
    path: '/usercenter',
    name: 'UserCenter',
    redirect: '/usercenter/userinfo',
    //路由的懒加载
    component: () => import('@/views/user/UserCenter'),
    meta:{
      role:"1"
    },
    children: [
      {
        path: 'userinfo',
        name: 'UserInfo',
        component: () => import('@/views/user/components/UserInfo'),
      },
      {
        path: 'projectinfo',
        name: 'ProjectInfo',
        component: () => import('@/views/user/components/ProjectInfo'),
      }
    ]
  },
  {
    path: '/init',
    name: 'Init',
    //路由的懒加载
    component: () => import('@/views/project/Init'),
    meta:{
      role:"1"
    }
  },
  {
    path: '/project',
    name: 'Project',
    //路由的懒加载
    component: () => import('@/views/project/Layout'),
    meta:{
      role:"1"
    }
  },
  {
    path:'/admin',
    name:'Admin',
    component:() => import('@/views/admin/Admin'),
    meta:{
      role:"2"
    }
  }
];

const router = new VueRouter({
  mode: "history",
  // base: process.env.BASE_URL,
  routes:constRoutes,
});

export default router;
