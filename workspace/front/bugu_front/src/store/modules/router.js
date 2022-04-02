// 动态添加路由使用
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
				// console.log(add)
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