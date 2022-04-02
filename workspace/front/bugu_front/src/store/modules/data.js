// 数据仓库的操作
export default{
	state:{
		tableData:[],//总数据
		placement:'right',
		visible:false,
		wrap:{},
		title:"数据总仓库"
	},
	actions:{
	},
	mutations:{
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
		SET_TABLEDATA(state,value){
			state.tableData = value
			console.log("SET_TABLEDATA被调用了")
		}
	}
}