// 描述文件的操作
export default{
	state:{
		// 项目基本信息
		project:{
			id:"",
			name:"",
			type:"",
			token:"",
			abstract:"",
			chip:"",
			stack:""
		},
		//已有类的信息
		classes:[{
			id: "0-1-0",
			name: "类1",
      extend:false,
			description: "类：xxxx",//简介
			attrsId:["o-0-1-0"],//属性库的ID
			methodsId:["c-0-1-0"]//方法库的ID
		},
		{
			id: "0-1-1",
			name: "类2",
      extend:false,
			description: "类：xxxx",//简介
			attrsId:["o-0-1-1"],//属性库的ID
			methodsId:["c-0-1-1"]//方法库的ID
		},
	],
		methods:[],
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