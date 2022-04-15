/*
 * @Description: 数据表定义
 * @version: 1.0.0
 * @Author: WPO
 * @Date: 2022-04-10 14:24:39
 * @LastEditors: WPO
 * @LastEditTime: 2022-04-14 19:35:25
 */

const { DataTypes } = require('sequelize');
const sequelize = require('./db');
sequelize.authenticate()
	.then(() => {
		console.log('已成功连接数据库');
	})
			
	.catch ((error) => {
		console.error('连接数据库出错:', error);
	})

// 修改表
// sequelize.sync({ alter: true })
// .then(() => {
// 	console.log('已成功连接数据库');
// })
		
// .catch ((error) => {
// 	console.error('连接数据库出错:', error);
// })

// 默认情况下,Sequelize 使用数据类型 DataTypes.DATE 自动向每个模型添加 createdAt 和 updatedAt 字段. 
// 这些字段会自动进行管理
// define('对应的模型名'，{对应字段数据类型}，{选填参数配置}) 

// 用户信息
const userInfo = sequelize.define('userInfo',{
	id : {
		type: DataTypes.INTEGER,
		allowNull : false,
		autoIncrement: true,
    primaryKey: true
	},
	userName : {
		type : DataTypes.STRING,
		allowNull : false,
		unique:true
	}, 
	nickName : {
		type : DataTypes.STRING,
		allowNull : false
	},
	pass : {
		type : DataTypes.STRING,
		allowNull : false
	},
	tel : {
		type : DataTypes.STRING,
		allowNull : false
	},
	role : {
		type : DataTypes.STRING,
		allowNull : false,
		defaultValue: "1"
	},
	engineeringsId : {
		type : DataTypes.STRING,
		defaultValue: ""
	},
	componentsId : {
		type : DataTypes.STRING,
		defaultValue: ""
	},
});

// 芯片信息
const chip= sequelize.define('chip',{
	id : {
		type: DataTypes.INTEGER,
		allowNull : false,
		autoIncrement: true, // 自增
    primaryKey: true // 主键
	},
	author : {
		type : DataTypes.STRING,
		allowNull : false,
		defaultValue:"BUGU"
	},
	name : {
		type : DataTypes.STRING,
		allowNull : false
	},
	token : {
		type : DataTypes.STRING,
		allowNull : false,
		defaultValue: "chip"
	},
	type : {
		type : DataTypes.STRING,
		allowNull : false,
		defaultValue : "2"
	},
	description:{
		type : DataTypes.STRING,
		allowNull : false,
		defaultValue: "这是一个芯片"
	}
});

// 工程项目信息
const engineering = sequelize.define('engineering',{
	id : {
		type: DataTypes.INTEGER,
		allowNull : false,
		autoIncrement: true, // 自增
    primaryKey: true // 主键
	},
	// 外键
	userId : {
		type : DataTypes.INTEGER,
		references:{
			 // 这是对另一个模型的参考
			 model: userInfo,
			 // 这是引用模型的列名
			 key: 'id',
		},
		allowNull : false,
	}, 
	author : {
		type : DataTypes.STRING,
		allowNull : false,
		defaultValue:"BUGU"
	},
	chipId : {
		type : DataTypes.STRING,
		allowNull : false,
		defaultValue : "0"  
	},
	name : {
		type : DataTypes.STRING,
		allowNull : false
	},
	token : {
		type : DataTypes.STRING,
		allowNull : false,
		defaultValue: "engineering"
	},
	type : {
		type : DataTypes.STRING,
		allowNull : false,
		defaultValue : "2"
	},
	stack : {
		type : DataTypes.STRING,
		allowNull : false,
		defaultValue: ""
	},
	componentsId:{
		type : DataTypes.STRING,
		allowNull : false,
		defaultValue: ""
	},
	description:{
		type : DataTypes.STRING,
		allowNull : false,
		defaultValue: "这是一个工程项目"
	}
});

// 组件项目信息
const component = sequelize.define('component',{
	id : {
		type: DataTypes.INTEGER,
		allowNull : false,
		autoIncrement: true, // 自增
    primaryKey: true // 主键
	},
	// 外键
	userId : {
		type : DataTypes.INTEGER,
		references:{
			 // 这是对另一个模型的参考
			 model: userInfo,
			 // 这是引用模型的列名
			 key: 'id',
		},
		allowNull : false
	}, 
	engineeringIds : {
		type : DataTypes.STRING,
		allowNull : false,
		defaultValue:"0"
	}, 
	author : {
		type : DataTypes.STRING,
		allowNull : false,
		defaultValue:"BUGU"
	},
	name : {
		type : DataTypes.STRING,
		allowNull : false
	},
	token : {
		type : DataTypes.STRING,
		allowNull : false,
		defaultValue: "component"
	},
	type : {
		type : DataTypes.STRING,
		allowNull : false,
		defaultValue : "2"
	},
	description:{
		type : DataTypes.STRING,
		allowNull : false,
		defaultValue: "这是一个组件项目"
	}
});

// 类信息
const type = sequelize.define('type',{
	id : {
		type: DataTypes.INTEGER,
		allowNull : false,
		autoIncrement: true, // 自增
    primaryKey: true // 主键
	},
	// 外键
	userId : {
		type : DataTypes.INTEGER,
		references:{
			 // 这是对另一个模型的参考
			 model: userInfo,
			 // 这是引用模型的列名
			 key: 'id',
		},
		allowNull : false
	}, 
	// 外键
	componentId : {
		type : DataTypes.INTEGER,
		references:{
			// 这是对另一个模型的参考
			model : component,
			// 这是引用模型的列名
			key: 'id',
			},
			allowNull : false
		}, 
	engineeringIds : {
		type : DataTypes.STRING,
		allowNull : false,
		defaultValue:"0"
	}, 
	author : {
		type : DataTypes.STRING,
		allowNull : false,
		defaultValue:"BUGU"
	},
	name : {
		type : DataTypes.STRING,
		allowNull : false
	},
	token : {
		type : DataTypes.STRING,
		allowNull : false,
		defaultValue: "class"
	},
	type : {
		type : DataTypes.STRING,
		allowNull : false,
		defaultValue : "2"
	},
	extend : {
		type : DataTypes.STRING,
		allowNull : false,
		defaultValue : "0"
	},
	parentId : {
		type : DataTypes.STRING,
		allowNull : false,
		defaultValue : "0"
	},
	chipId : {
		type : DataTypes.STRING,
		allowNull : false,
		defaultValue : "0"
	},
	description:{
		type : DataTypes.STRING,
		allowNull : false,
		defaultValue: "这是一个类"
	}
});

// 方法信息 包括重载
const method = sequelize.define('method',{
	id : {
		type: DataTypes.INTEGER,
		allowNull : false,
		autoIncrement: true, // 自增
    primaryKey: true // 主键
	},
	// 外键
	userId : {
		type : DataTypes.INTEGER,
		references:{
			 // 这是对另一个模型的参考
			 model: userInfo,
			 // 这是引用模型的列名
			 key: 'id',
		},
		allowNull : false
	}, 
	// 外键
	classId : {
		type : DataTypes.INTEGER,
		references:{
			// 这是对另一个模型的参考
			model : type,
			// 这是引用模型的列名
			key: 'id',
			},
			allowNull : false
		}, 
	engineeringIds : {
		type : DataTypes.STRING,
		allowNull : false,
		defaultValue:"0"
	}, 
	author : {
		type : DataTypes.STRING,
		allowNull : false,
		defaultValue:"BUGU"
	},
	name : {
		type : DataTypes.STRING,
		allowNull : false
	},
	token : {
		type : DataTypes.STRING,
		allowNull : false,
		defaultValue: "method"
	},
	type : {
		type : DataTypes.STRING,
		allowNull : false,
		defaultValue : "2"
	},
	// 公开或者私有
	auth : {
		type : DataTypes.STRING,
		allowNull : false,
		defaultValue : "0"
	},
	description:{
		type : DataTypes.STRING,
		allowNull : false,
		defaultValue: "这是一个方法"
	}
});

// 数据信息
const data = sequelize.define('data',{
	id : {
		type: DataTypes.INTEGER,
		allowNull : false,
		autoIncrement: true, // 自增
    primaryKey: true // 主键
	},
	key : {
		type: DataTypes.STRING,
		allowNull : false,
		defaultValue: ""
	},
	// 外键
	userId : {
		type : DataTypes.INTEGER,
		references:{
			 // 这是对另一个模型的参考
			 model: userInfo,
			 // 这是引用模型的列名
			 key: 'id',
		},
		allowNull : false
	}, 
	classId : {
		type : DataTypes.INTEGER,
			allowNull : false
	}, 
	methodId : {
		type : DataTypes.INTEGER,
		allowNull : true
	},
	engineeringIds : {
		type : DataTypes.STRING,
		allowNull : false,
		defaultValue:"0"
	}, 
	author : {
		type : DataTypes.STRING,
		allowNull : false,
		defaultValue:"BUGU"
	},
	name : {
		type : DataTypes.STRING,
		allowNull : false
	},
	token : {
		type : DataTypes.STRING,
		allowNull : false,
		defaultValue: "data"
	},
	type:{
		type : DataTypes.STRING,
		allowNull : false,
		defaultValue : "0"
	},
	defaultV : {
		type : DataTypes.STRING,
		allowNull : false,
		defaultValue:"0"
	},
	dataType : {
		type : DataTypes.STRING,
		allowNull : false,
		defaultValue : "0"
	},
	varType:{
		type : DataTypes.STRING,
		allowNull : false,
		defaultValue : "0"
	},
	description:{
		type : DataTypes.STRING,
		allowNull : false,
		defaultValue: "这是一个数据成员"
	}
});
// data.sync({ alter: true })
module.exports = {
	userInfo,
	component,
	engineering,
	type,
	method,
	chip,
	data
}