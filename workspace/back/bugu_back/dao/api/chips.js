/*
 * @Description: 芯片表的操作
 * @version: 1.0.0
 * @Author: WPO
 * @Date: 2022-04-11 10:41:13
 * @LastEditors: WPO
 * @LastEditTime: 2022-04-11 10:41:13
 */

const model = require('../dbModel');
// model.chip.sync({alter:true})
const dao = require('../../utils/dao') 

const queryById = (req) => dao.queryById(req,model.chip)
const queryAll = () => dao.queryByAll(model.chip)
const add = (req) => dao.add(req,model.chip)
const update = (req) => dao.update(req,model.chip)
const del = (req) => dao.del(req,model.chip)

module.exports = {
	add,
	queryById,
	queryAll,
	update,
	del
}