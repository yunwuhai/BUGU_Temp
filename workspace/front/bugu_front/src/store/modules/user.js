// 与用户有关的数据管理
export default{
	state:{
		userInfo:{
			userName:"",
			pass:"",
			tel:"",
			role:""
		}
	},
	actions:{
		login(context,value){
			/*
				发送后端验证
			*/
			if(context.state.userInfo.userName === value.userName && context.state.userInfo.pass === value.pass){
				this.$message.success('登陆成功', 0.5)
				context.commit('SET_USERINFO',value)
				this.$router.push({ name: 'Project' })
			}
		},
		register(context,value){
			/*
				发送后端验证
			*/
			if(context.state.userInfo.userName === value.userName && context.state.userInfo.pass === value.pass){
				this.$message.success('登陆成功', 0.5)
				this.$router.push({ name: 'Project' })
			}
		},
	},
	mutations:{
		SET_USERINFO(state,value){
			state.userInfo = value
			console.log('SET_USERINFO被调用了')
		}
	}
}