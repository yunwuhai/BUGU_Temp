/*
 * @Description: 组件项目表操作
 * @version: 1.0.0
 * @Author: WPO
 * @Date: 2022-04-10 20:28:46
 * @LastEditors: WPO
 * @LastEditTime: 2022-05-03 20:06:30
 */

const model = require('../dbModel');
// model.component.sync({alter:true})
const dao = require('../../utils/dao') 

const queryById = (req) => dao.queryById(req,model.component)
const queryAll = () => dao.queryByAll(model.component)
const add = (req) => dao.add(req,model.component)
const update = (req) => dao.update(req,model.component)
const del = (req) => dao.del(req,model.component)
const delByEid = (req) => dao.delByEid(req,model.component)

// 根据用户id找到树形菜单需要的
const treeNode = (uid,cols,order) => dao.queryCols(uid,model.component,cols,order)

// 通过工程id找到其中的组件相关信息
const getByEid = (eid,cols) => {
	return model.component.findAll({
		attributes : cols,
		where : {
			engineeringIds : eid
		}
	})
}
// 通过类别找到相关组件
const getByType = (type) =>dao.queryByType(type,model.component)

module.exports = {
	add,
	queryById,
	queryAll,
	update,
	del,
	delByEid,
	treeNode,
	getByType,
	getByEid
}