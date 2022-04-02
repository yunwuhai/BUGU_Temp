//数据操作
const mutations ={
SET_USERINFO(state,value){
	state.userInfo = value
	console.log('SET_USERINFO被调用了')
}
}
export default mutations