/*
 * @Description: 组件项目表操作
 * @version: 1.0.0
 * @Author: WPO
 * @Date: 2022-04-10 20:28:46
 * @LastEditors: WPO
 * @LastEditTime: 2022-04-11 13:43:29
 */

const model = require('../dbModel');
// model.component.sync({alter:true})
const dao = require('../../utils/dao') 

const queryById = (req) => dao.queryById(req,model.component)
const queryAll = () => dao.queryByAll(model.component)
const add = (req) => dao.add(req,model.component)
const update = (req) => dao.update(req,model.component)
const del = (req) => dao.del(req,model.component)

// 根据用户id找到树形菜单需要的
const treeNode = (uid,cols,order) => dao.queryCols(uid,model.component,cols,order)

// 通过类别找到相关组件
const getByType = (type) =>dao.queryByType(type,model.component)

module.exports = {
	add,
	queryById,
	queryAll,
	update,
	del,
	treeNode,
	getByType
}