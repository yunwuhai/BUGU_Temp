/*
 * @Description: 
 * @version: 1.0.0
 * @Author: WPO
 * @Date: 2022-04-11 10:40:54
 * @LastEditors: WPO
 * @LastEditTime: 2022-04-12 18:50:56
 */

const model = require('../dbModel');
// model.method.sync({alter:true})
const dao = require('../../utils/dao'); 
const { Op } = require("sequelize");

const queryById = (req) => dao.queryById(req,model.method)
const queryAll = () => dao.queryByAll(model.method)
const add = (req) => dao.add(req,model.method)
const update = (req) => dao.update(req,model.method)
// 根据用户id找到树形菜单需要的
const treeNode = (uid,cols,order) => dao.queryCols(uid,model.method,cols,order)

// 通过类别找到相关方法
const getByType = (type) =>dao.queryByType(type,model.method)

// 删除方法和对应重载
const del = (req) =>{
	return model.method.destroy({
		where:{
			[Op.or]: [
				{ name: req.name },
				{ id: req.id }
			]
		}
	})
} 

// 删除指定重载
const delOverload = (req) => dao.del(req,model.method)

// 找到方法对应的重载
const updateOverload = async (req) => {
await	model.method.update(
		{
			name: req.name,
			token: req.token,
		},
		{
		where : {
			name : req.oldName,
			type : "5"
		}
	}) 
	return model.method.findAll({
		where:{
			name: req.name
		}
	});
}

module.exports = {
	add,
	queryById,
	queryAll,
	update,
	del,
	getByType,
	updateOverload,
	delOverload,
	treeNode
}