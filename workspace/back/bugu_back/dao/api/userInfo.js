/*
 * @Description: 用户信息表的操作
 * @version: 1.0.0
 * @Author: WPO
 * @Date: 2022-04-10 16:16:46
 * @LastEditors: WPO
 * @LastEditTime: 2022-04-22 11:26:49
 */
 

const model = require('../dbModel');
// model.userInfo.sync({alter:true})
const dao = require('../../utils/dao') 
const sequelize = require("sequelize")

const login = (req) => {
	return model.userInfo.findAll({
		where:{
			userName:sequelize.where(sequelize.fn('BINARY', sequelize.col('userName')),  req.userName),
			pass:sequelize.where(sequelize.fn('BINARY', sequelize.col('pass')),  req.pass),
		}
  })
}

const queryById = (req) => dao.queryById(req,model.userInfo)
const queryAll = () => dao.queryByAll(model.userInfo)
const add = (req) => dao.add(req,model.userInfo)
const update = (req) => dao.update(req,model.userInfo)
const del = (req) => dao.del(req,model.userInfo)

module.exports = {
	login,
	add,
	queryById,
	queryAll,
	update,
	del
}