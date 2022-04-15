/*
 * @Description: 
 * @version: 1.0.0
 * @Author: WPO
 * @Date: 2022-03-31 17:04:19
 * @LastEditors: WPO
 * @LastEditTime: 2022-04-13 21:29:59
 */
// 数据仓库的操作
export default{
	state:{
		tableData:[],//总数据
		placement:'right',
		visible:false,
		classId:"",
		wrap:{},
		addStatus:true,
		title:"数据总仓库"
	},
	actions:{
	},
	mutations:{
		SET_CLASSID(state,value){
			state.classId= value
			console.log("SET_CLASSID被调用了")
		},
		SET_PLACEMENT(state,value){
			state.placement = value
			console.log("SET_PLACEMENT被调用了")
		},
		SET_VISIBLE(state,value){
			state.visible = value
			console.log("SET_VISIBLE被调用了")
		},
		SET_WRAP(state,value){
			state.wrap = value
			console.log("SET_WRAP被调用了")
		},
		SET_TITLE(state,value){
			state.title = value
			console.log("SET_TITLE被调用了")
		},
		SET_ADDSTATUS(state,value){
			state.addStatus = value
			console.log("SET_ADDSTATUS被调用了")
		},
		SET_TABLEDATA(state,value){
			state.tableData = value
			console.log("SET_TABLEDATA被调用了")
		},
		ADD_TABLEDATA(state,value){
			state.tableData.push(value)
			console.log("ADD_TABLEDATA被调用了")
		},
		CLEAR_TABLEDATA(state){
			state.tableData.splice(0,state.tableData.length)
			console.log("CLEAR_TABLEDATA被调用了")
		}
	}
}