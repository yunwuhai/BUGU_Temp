export default {
	state:{
		collapsed: false,
		close:[],
		selected:[]
	},
	actions:{

	},
	mutations:{
		SET_COLLAPSED(state,value){
			state.collapsed = value
			console.log("SETCOLLAPSED被调用")
		},
		SET_CLOSE(state,value){
			state.close = value
			console.log("SETCLOSE被调用")
		},
		SET_SELECTED(state,value){
			state.selected = value
			console.log("SETSELECTED被调用")
		}
	}
}