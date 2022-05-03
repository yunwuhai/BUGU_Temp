/*
 * @Description: 封装数据库增删查改
 * @version: 1.0.0
 * @Author: WPO
 * @Date: 2022-04-10 20:44:53
 * @LastEditors: WPO
 * @LastEditTime: 2022-05-03 02:39:29
 */

const queryById = (req,model) => {
	return model.findAll({
		where:{
			id : req
		}
	});
}

const queryByAll = (model) => {
	return model.findAll();
}

const queryCols = async(uid,model,cols,order = ['id', 'ASC']) => {
	return await model.findAll({
		attributes : cols,
		where : {
			userId : uid
 		},
		order:[
			order
		 ]
	}) 
}

const queryByType = (req,model) => {
	return model.findAll({
		where:{
			type : req
		}
	});
}

const add = (req,model) => {
	return model.create(req);
}

const update = (req,model) => {
	model.update(req,
		{
		where:{
			id : req.id,
		},
	})
	return queryById(req.id,model);
}

const del = (req,model) => {
	return model.destroy({
		where:{
			id : req
		}
	});
}

const delByEid = (req,model) => {
	req = req.toString()
	return model.destroy({
		where:{
			engineeringIds : req
		}
	});
}

module.exports = {
	queryById,
	queryByAll,
	queryByType,
	queryCols,
	add,
	update,
	del,
	delByEid
}