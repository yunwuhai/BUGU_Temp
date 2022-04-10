/*
 * @Description: 动态添加路由使用
 * @version: 1.0.0
 * @Author: WPO
 * @Date: 2022-03-30 11:58:23
 * @LastEditors: WPO
 * @LastEditTime: 2022-04-09 14:24:21
 */

import {asyncRoutes} from '@/router'
// constRoutes,
export default{
	state:{
		addRoutes:[]
	},
	actions:{
		addRoutes: ({ commit }, value) => {
			console.log("addRoutes被调用")
			// console.log(asyncRoutes)
      return new Promise((resolve) => {
        const add = asyncRoutes.filter(item => item.meta.role === value)
				add.push({path: '*', redirect: '/404'})
        commit('SET_ROUTES', add)
        resolve(add)
      })
    },
	},
	mutations:{
		SET_ROUTES(state,value){
			state.addRoutes = value
			console.log('SET_ROUTES被调用了')
		}
	}
}