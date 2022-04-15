/*
 * @Description: 工程项目表操作
 * @version: 1.0.0
 * @Author: WPO
 * @Date: 2022-04-10 20:27:13
 * @LastEditors: WPO
 * @LastEditTime: 2022-04-11 15:54:23
 */

const model = require('../dbModel');
// model.userInfo.sync({alter:true})
const dao = require('../../utils/dao') 

const queryById = (req) => dao.queryById(req,model.engineering)
const queryAll = () => dao.queryByAll(model.engineering)
const add = (req) => dao.add(req,model.engineering)
const update = (req) => dao.update(req,model.engineering)
const del = (req) => dao.del(req,model.engineering)

module.exports = {
	add,
	queryById,
	queryAll,
	update,
	del
}