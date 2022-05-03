/*
 * @Description: 工程项目表操作
 * @version: 1.0.0
 * @Author: WPO
 * @Date: 2022-04-10 20:27:13
 * @LastEditors: WPO
 * @LastEditTime: 2022-05-03 02:26:33
 */

const model = require('../dbModel');
// model.userInfo.sync({alter:true})
const dao = require('../../utils/dao') 

const queryById = (req) => dao.queryById(req,model.engineering)
const queryAll = () => dao.queryByAll(model.engineering)
const add = (req) => dao.add(req,model.engineering)
const update = (req) => dao.update(req,model.engineering)
const del = (req) => dao.del(req,model.engineering)
const delByEid = (req) => dao.delByEid(req,model.engineering)
const queryByUid = (req) => {
	return model.engineering.findAll({
		where : {
			userId : req
		}
	})
}
module.exports = {
	add,
	queryById,
	queryByUid,
	queryAll,
	update,
	del,
	delByEid 
}