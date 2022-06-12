/*
 * @Description: 
 * @version: 1.0.0
 * @Author: WPO
 * @Date: 2022-04-11 10:40:54
 * @LastEditors: WPO
 * @LastEditTime: 2022-05-12 00:15:22
 */

const model = require('../dbModel');
// model.method.sync({alter:true})
const dao = require('../../utils/dao'); 
const { Op } = require("sequelize");
const classApi = require('./classes')

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
const delByEid = (req) => dao.delByEid(req,model.method)
const delByCid = (req) => {
	return model.method.destroy({
		where:{
			classId : req
		}
	})
}

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

// 通过类id获取公开的方法
const getClassMethod = (req) => {
	console.log(req);
	return model.method.findAll({
		where:{
			id:{
				[Op.ne] : req.mid
			},
			classId:req.cid,
			auth:"1",
			type:"5"
		}
	})
}

// 通过类的父类找到公开的方法
const getParentMethods = async(cid) => {
	let result = await classApi.queryById(cid)
	let classInfo = result[0].dataValues
	return model.method.findAll({
		where:{
			classId:classInfo.parentId,
			auth:"1",
			type:"5"
		}
	})
}

module.exports = {
	add,
	queryById,
	queryAll,
	update,
	del,
	delByEid,
	delByCid,
	getByType,
	updateOverload,
	delOverload,
	treeNode,
	getParentMethods,
	getClassMethod
}