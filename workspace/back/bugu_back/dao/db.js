/*
 * @Description: 初始化数据库连接
 * @version: 1.0.0
 * @Author: WPO
 * @Date: 2022-04-10 14:06:40
 * @LastEditors: WPO
 * @LastEditTime: 2022-04-11 11:17:44
 */

const Sequelize = require('sequelize')
const config = require('../config/dbConfig')

module.exports = new Sequelize(
	config.database,
	config.user,
	config.password,
	{
		host : config.host,
		dialect : config.dialect,
		pool : {
			max : config.connectionLimit,
			min : 0,
			idle: 30000 // 如果一个线程 10 秒钟内没有被使用过的话，那么就释放线程
 		},
		 dialectOptions:{
			charset:'utf8mb4',  //字符集
		},
		 timezone : '+08:00'
	});
