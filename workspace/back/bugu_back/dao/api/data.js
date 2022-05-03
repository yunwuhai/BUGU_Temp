/*
 * @Description: 数据表操作
 * @version: 1.0.0
 * @Author: WPO
 * @Date: 2022-04-12 23:37:21
 * @LastEditors: WPO
 * @LastEditTime: 2022-05-04 00:35:15
 */

const model = require('../dbModel');
// model.data.sync({alter:true})
const dao = require('../../utils/dao') 

const queryById = (req) => dao.queryById(req,model.data)
const queryAll = () => dao.queryByAll(model.data)
const add = (req) => dao.add(req,model.data)
const update = (req) => dao.update(req,model.data)
const del = (req) => dao.del(req,model.data)
const delByEid = (req) => dao.delByEid(req,model.data)
const delByMid = (req) => {
	return model.data.destroy({
		where:{
			methodId : req
		}
	});
}
// 获取输入参数
const getInOrOut = (req) => {
	return model.data.findAll({
		where:{
			methodId:req.id,
			type:req.type
		}
	})
}

const queryByEngin = (req) => {
	return model.data.findAll({
		where:{
			userId:req.userId,
			engineeringIds: req.engineeringIds
		}
	})
}

const queryByClass = (req) => {
	return model.data.findAll({
		where:{
			userId:req.userId,
			classId: req.classId
		}
	})
}

module.exports = {
	add,
	queryById,
	queryByEngin,
	queryByClass,
	queryAll,
	update,
	del,
	delByMid,
	delByEid,
	getInOrOut
}