/*
 * @Description: 描述文件的操作
 * @version: 1.0.0
 * @Author: WPO
 * @Date: 2022-03-31 03:08:14
 * @LastEditors: WPO
 * @LastEditTime: 2022-04-24 01:44:43
 */
export default{
	state:{
		createVisible:false,
		// 项目基本信息
		project:{
		},
		userTree:[],
		systemTree:[],
		//已有类的信息
		// classes:[],
		// methods:[],
		desData:{},
	},
	actions:{

	},
	mutations:{
		SET_CREATEVISIBLE(state,value){
			state.createVisible = value
			console.log("SET_CREATEVISIBLE被调用了")
		},
		SET_PROJECT(state,value){
			state.project = value
			console.log("SET_PROJECT被调用了")
		},
		UPDATE_LOGIC(state,value){
			state.desData.logic = value
		},
		UPDATE_PARAMIN(state,value){
			state.desData.paramIn = value
		},
		UPDATE_PARAMOUT(state,value){
			state.desData.paramOut = value
		},
		SET_DESDATA(state,value){
			state.desData = value
			console.log("SET_DESDATA被调用了")
		},
		SET_USERTREE(state,value){
			state.userTree = value
			console.log("SET_USERTREE被调用了")
		},
		SET_SYSTEMTREE(state,value){
			state.systemTree = value
			console.log("SET_SYSTEMTREE被调用了")
		}
	}
}