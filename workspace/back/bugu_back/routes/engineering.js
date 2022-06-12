/*
 * @Description: 工程项目信息路由
 * @version: 1.0.0
 * @Author: WPO
 * @Date: 2022-04-10 23:08:49
 * @LastEditors: WPO
 * @LastEditTime: 2022-05-12 01:04:13
 */

const express = require('express');
const router = express.Router();
const enginApi = require('../dao/api/engineerings')
const dataApi = require('../dao/api/data')
const methodApi = require('../dao/api/methods')
const classApi = require('../dao/api/classes')
const compApi = require('../dao/api/components')
const init = require('../service/init')
const desApi = require('../service/desFile')

router.post('/init', (req, res) => {
	// init.createDes(req.body)
	init.creatEngin(req.body)
	.then((result) => {
		if(result !== {}){
			res.json({
				code : 200,
				msg : "新建工程信息成功",
				data: result
			})
		}else{
			res.json({
				code : 489,
				msg : '新建失败' + err
			})
		}
	})
	.catch((err) => {
		res.json({
			code : 587,
			msg : '错误信息' + err
		})
	})
})

router.get('/', (req, res) => {
  enginApi.queryAll()
	.then((result) => {
		// 返回对象数组
		if(result){
			let data = result.map(item => item.dataValues) 
			res.json({
				code : 200,
				msg : "已找到所有工程信息",
				data:data
			})
		}else{
			res.json({
				code : 489,
				msg : "未找到信息"
			})
		}
	})
	.catch((err) => {
		console.log(err)
		res.json({
			code : 587,
			msg : '错误信息' + err
		})
	})
})

router.get('/:id', (req, res) => {
  enginApi.queryById(req.params.id)
	.then((result) => {
		// 返回对象数组
		if(result[0].dataValues){
			res.json({
				code:200,
				msg:"已找到该工程",
				data:result[0].dataValues
			})
		}else{
			res.json({
				code:489,
				msg : "未找到信息"
			})
		}
	})
	.catch((err) => {
		console.log(err)
		res.json({
			code : 587,
			msg : '错误信息' + err
		})
	})
})

router.get('/user/:uid', (req, res) => {
  enginApi.queryByUid(req.params.uid)
	.then((result) => {
		// 返回对象数组
		if(result.length){
			let data = result.map(item => item.dataValues) 
			res.json({
				code:200,
				msg:"已找到该工程",
				data:data
			})
		}else{
			res.json({
				code:489,
				msg : "未找到信息"
			})
		}
	})
	.catch((err) => {
		console.log(err)
		res.json({
			code : 587,
			msg : '错误信息' + err
		})
	})
})

router.post('/',(req, res) => {
  enginApi.add(req.body)
	.then((result) => {
		// 返回对象
		if(result.dataValues){
			res.json({
				code : 200,
				msg : "新建工程信息成功",
				data : result.dataValues
			})
		}else{
			res.json({
				code : 488,
				msg : "新建工程信息失败"
			})
		}
	})
	.catch((err) => {
		res.json({
			code : 587,
			msg : '错误信息' + err
		})
	})
})

router.put('/', (req, res) => {
	desApi.updateDesPro(req.body)
  enginApi.update(req.body)
	.then((result) => {
		// console.log(result)
		// 返回对象数组
		if(result){
			res.json({
				code : 200,
				msg : "已更新该工程",
				data : result
			})
		}else{
			res.json({
				code:489,
				msg : "未找到信息"
			})
		}
	})
	.catch((err) => {
		console.log(err)
		res.json({
			code : 587,
			msg : '错误信息' + err
		})
	})
})

const delAll = async(eid) =>{
	await dataApi.delByEid(eid)
	await methodApi.delByEid(eid)
	await classApi.delByEid(eid)
	await compApi.delByEid(eid)
}
router.delete('/:id', (req, res) => {
	delAll(req.params.id)
	.catch(err => {
		if(err){
			console.error(err)
		}else{
			console.log("删除成功");
		}
	})
	desApi.delDes(req.params.id)
  enginApi.del(req.params.id)
	.then((result) => {
		// 返回对象数组
		if(result){
			res.json({
				code : 200,
				msg : "已删除该工程",
			})
		}else{
			res.json({
				code:489,
				msg : "删除失败"
			})
		}
	})
	.catch((err) => {
		console.log(err)
		res.json({
			code : 587,
			msg : '错误信息' + err
		})
	})
})

module.exports = router