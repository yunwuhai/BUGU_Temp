// 用于侧边栏的组件通信
export default {
	state:{
		collapsed: false,//收起侧边栏
		expanded:[],//树形菜单展开项
		selected:[]//树形菜单选择项
	},
	actions:{

	},
	mutations:{
		SET_COLLAPSED(state,value){
			state.collapsed = value
			console.log("SETCOLLAPSED被调用")
		},
		SET_EXPAND(state,value){
			state.expanded=value
			console.log("SETEXPAND被调用")
		},
		SET_SELECTED(state,value){
			state.selected = value
			console.log("SETSELECTED被调用")
		}
	}
}