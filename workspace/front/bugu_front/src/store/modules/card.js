// 描述文件的操作
export default{
	state:{
		desData:[],
	},
	actions:{
		getDesData(){

		}
	},
	mutations:{
		SET_DESDATA(state,value){
			state.desData = value
			console.log("SET_DESDATA被调用了")
		}
	}
}