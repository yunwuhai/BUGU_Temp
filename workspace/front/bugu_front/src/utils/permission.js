/*
 * @Description: 路由守卫 检测全局所有的路由变化
 * @version: 1.0.0
 * @Author: WPO
 * @Date: 2022-03-25 22:18:30
 * @LastEditors: WPO
 * @LastEditTime: 2022-04-09 14:21:49
 */

import router from '../router'
import store from '../store'
import NProgress from 'nprogress' // 进度条
import { getToken, removeToken, removeUserInfo,setLoginStatus, getUserInfo } from './token'
import { message } from 'ant-design-vue';


const whiteList = ['/entrance', '/404'] // no redirect whitelist
NProgress.configure({ showSpinner: true }) // showSpinner进度环显示隐藏

/**
  * 这里函数执行时候
  * 1.可以获取地址变化信息
  * 2.这里没有匹配到to地址的路由对象
  * 3.没有加载路由组件
	* 4.参数说明： 
		to:即将要进入的目标路由对象
		from:当前导航正要离开的路由
		next:在前置导航守卫中，一定要写next(),否则页面不会跳转页面
		to,from返回值是一个对象 就是routes数组里面配置的某个具体的路由对象
* */

// 正在跳转的路由是否存在
function hasRoute(to) {
	return router.getRoutes().find(item => item.name === to.name);
}
router.beforeEach(async (to, from, next) => {
	// console.log(this);//没有this
  // console.log('from-----',from)//变化前的信息
  // console.log('to-----',to)//变化后的信息
  NProgress.start()
  // 存在token则已登录
  if (getToken() && getUserInfo()) {
		const role = getUserInfo().role
    // 登录过就不能访问登录界面，需要中断这一次路由守卫，执行下一次路由守卫，并且下一次守卫的to是主页
    if (to.path === '/entrance') {
			message.warning('用户已登录，返回主页',1)
      next({ path: '/usercenter' })
      NProgress.done()
    } 
		//没有项目信息 跳转到新建界面
		else if(to.path === '/project' && Object.keys(store.getters.project).length === 0){
			await store.commit("SET_CREATEVISIBLE",true)
			next({ path: '/init' })
		}
		else {
			if(hasRoute(to)){
				next()
			}else{
				// 根据身份动态加载路由
				try{
					const addRoutes = await store.dispatch('addRoutes',role)
					// console.log("动态增加的路由为",addRoutes)
					router.addRoutes(addRoutes)
					// 如果 addRoutes 并未完成，路由守卫会一层一层的执行执行，直到 addRoutes 完成，找到对应的路由
					next({ ...to, replace: true })
				} catch (err) {
				//重新登录
					message.error('权限获取失败')
					removeToken()
					setLoginStatus(false)
					removeUserInfo()
					next({ path: '/404' })
					NProgress.done()
				}
			}
		}
  // 未登录
  } else {
		// 白名单可直接访问
    if (whiteList.indexOf(to.path) !== -1) {
      // console.log('未登录但是请求页面在白名单')
      next()
    } else {
      // console.log('未登录而且页面不在白名单')
      message.error('请先登录！')
      //不在白名单内则直接跳回登陆界面
      next({ path: '/entrance'})
      NProgress.done()
    }
	}
})

// 全局后置钩子 它和前置守卫不同的地方在于 不会接受next函数 也不会改变导航本身 所以后置钩子不用添加next()
router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
