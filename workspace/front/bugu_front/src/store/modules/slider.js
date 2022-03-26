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
		SET_CLOSE_PUSH(state,value){
			state.close.push(...value)
			console.log("SETCLOSEPUSH被调用")
		},
		SET_CLOSE_CLEAR(state){
			state.close=[]
			console.log("SETCLOSECLEAR被调用")
		},
		SET_SELECTED(state,value){
			state.selected = value
			console.log("SETSELECTED被调用")
		}
	}
}