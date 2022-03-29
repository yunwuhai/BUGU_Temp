// 用于主体部分的组件通信
export default {
	state:{
		keys:[],//内容部分的key集合
		panes:[],//内容部分的选项卡
		activeKey:""//当前处于展示状态的选项卡key
	},
	actions:{
		
	},
	mutations:{
		SET_KEYS(state,value){
			state.keys.push(value)
			console.log("SET_KEYS被调用了")
		},
		REMOVE_KEYS(state,value){
			state.keys = state.keys.filter(item => item !== value);
			console.log("REMOVE_KEYS被调用了")
		},
		UPDATE_PANES_TITLE(state,value){
			state.panes.find((item)=>{
				if(item.key==value.key){
					item.title=value.title
					return true
				}
				return false
			})
			console.log("UPDATE_PANES_TITLE被调用了")
		},
		SET_PANES(state,value){
			state.panes.push(value)
			console.log("SET_PANES被调用了")
		},
		REMOVE_PANES(state,value){
			state.panes = state.panes.filter(item => item.key !== value)
			console.log("REMOVE_PANES被调用了")
		},
		SET_ACTIVE(state,value){
			state.activeKey = value
			console.log("SET_ACTIVE被调用了")
		}
	}
}