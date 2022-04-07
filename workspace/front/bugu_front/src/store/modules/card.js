// 描述文件的操作
export default{
	state:{
		createVisible:false,
		// 项目基本信息
		project:{
			id: "wpowpowpo",//项目id
      type: "0",
      name: 'wpo的项目',
			token:'wpoPro',
      stack: '',
      chip: '1',
      abstract: '0',
			componentId:[]
		},
		//已有类的信息
		classes:[],
		methods:[],
		desData:[],
	},
	actions:{
		getDesData({commit},value){
			if(value==='mwpowpowpo_0_0_0_0'){
				commit("SET_PANES",[{
					key: '1',
					name: 'John Brown',
					age: 32,
					address: 'New York No. 1 Lake Park',
					tags: ['nice', 'developer'],
				},
				{
					key: '2',
					name: 'Jim Green',
					age: 42,
					address: 'London No. 1 Lake Park',
					tags: ['loser'],
				},
				{
					key: '3',
					name: 'Joe Black',
					age: 32,
					address: 'Sidney No. 1 Lake Park',
					tags: ['cool', 'teacher'],
				}])
			}else{
				commit("SET_DESDATA",[{
					key: '1',
					name: 'John Brown',
					age: 32,
					address: 'New York No. 1 Lake Park',
					tags: ['nice', 'developer'],
				}])
			}
		}
	},
	mutations:{
		SET_CREATEVISIBLE(state,value){
			state.createVisible = value
			console.log("SET_CREATEVISIBLE被调用了")
		},
		SET_PROJECT(state,value){
			state.project = value
			console.log("SET_PROJECT被调用了")
		},
		SET_DESDATA(state,value){
			state.desData = value
			console.log("SET_DESDATA被调用了")
		}
	}
}