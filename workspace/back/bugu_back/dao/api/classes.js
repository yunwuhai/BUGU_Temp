/*
 * @Description: 类表的增删查改
 * @version: 1.0.0
 * @Author: WPO
 * @Date: 2022-04-11 10:39:48
 * @LastEditors: WPO
 * @LastEditTime: 2022-04-14 16:17:31
 */

const model = require('../dbModel');
// model.type.sync({alter:true})
const dao = require('../../utils/dao') 
const { Op } = require("sequelize");

const queryById = (req) => dao.queryById(req,model.type)
const queryAll = () => dao.queryByAll(model.type)
const add = (req) => dao.add(req,model.type)
const update = (req) => dao.update(req,model.type)
const del = (req) => dao.del(req,model.type)

// 根据用户id找到树形菜单需要的
const treeNode = (uid,cols,order) => dao.queryCols(uid,model.type,cols,order)

// 通过类别找到相关组件
const getByType = (type) =>dao.queryByType(type,model.type)

// 获得父类列表
const getParentList = (req) => {
	return model.type.findAll({	
		where:{
			id:{
				[Op.ne] : req
			},
			type:{
				[Op.ne] : '0'
			}
		}
	})
}
module.exports = {
	add,
	queryById,
	queryAll,
	update,
	del,
	treeNode,
	getByType,
	getParentList
}