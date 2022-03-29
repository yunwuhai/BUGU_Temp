// //路由守卫
// import router from '../router'
// import NProgress from 'nprogress' // progress bar
import { getToken, removeToken } from './token'
import { Message } from 'element-ui'
import store from '../store'

// const whiteList = ['/login', '/page401'] // no redirect whitelist
// NProgress.configure({ showSpinner: false }) // NProgress Configuration

// // const admin = ['01', '02', '021', '0211', '444', '03', '04', '051', '05', '005', '0051', '032', '0321']
// router.beforeEach(async (to, from, next) => {
//   NProgress.start()
//   // 存在token则已登录
//   if (getToken()) {
//     // 登录过就不能访问登录界面，需要中断这一次路由守卫，执行下一次路由守卫，并且下一次守卫的to是主页'
//     if (to.path === '/login') {
//       next({ path: '/' })
//       NProgress.done()
//     } else {
//       // 这个条件证明为新登录的账号，直接将接口返回的权限赋给这个账号即可
//       if (store.getters.auths === 'none') {
//         // 1、从接口获取当前账号权限
//         try {
//           const roles = await store.dispatch('getUserInfo')
//           const addRouters = await store.dispatch('generateRouters', roles)
//           router.addRoutes(addRouters)
//           // 如果 addRoutes 并未完成，路由守卫会一层一层的执行执行，直到 addRoutes 完成，找到对应的路由
//           next({ ...to, replace: true })
//         } catch (err) {
//           removeToken()
//           Message.error('权限获取失败')
//           next('/page401')
//           NProgress.done()
//         }
//       } else {
//         next()
//       }
//     }
//   // 未登录
//   } else {
//     // if (from.path !== '/') {
//     //   Message.error('token失效，请重新登录')
//     // }
//     if (whiteList.indexOf(to.path) !== -1) {
//       // console.log('未登录但是请求页面在白名单')
//       // in the free login whitelist, go directly
//       next()
//     } else {
//       // console.log('未登录而且页面不在白名单')
//       // Message.error('请先登录！')
//       // other pages that do not have permission to access are redirected to the login page.
//       next({ path: '/login', replace: true })
//       NProgress.done()
//     }
//   }
// })
// router.afterEach(() => {
//   // finish progress bar
//   NProgress.done()
// })
