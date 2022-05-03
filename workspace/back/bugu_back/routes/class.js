/*
 * @Description: 类操作的路由
 * @version: 1.0.0
 * @Author: WPO
 * @Date: 2022-04-11 10:42:01
 * @LastEditors: WPO
 * @LastEditTime: 2022-05-03 03:07:41
 */

const express = require('express');
const router = express.Router();
const classApi = require('../dao/api/classes')
const desApi = require('../service/desFile')
const dataApi = require('../dao/api/data')
const methodApi = require('../dao/api/methods')

router.get('/', (req, res) => {
  classApi.queryAll()
	.then((result) => {
		// 返回对象数组
		if(result){
			let data = result.map(item => item.dataValues) 
			res.json({
				code : 200,
				msg : "已找到所有类信息",
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

router.post('/des', (req, res) => {
	// console.log(req.body)
	desApi.addClass(req.body,res)
})

router.delete('/des', (req, res) => {
	// console.log(req.body)
	desApi.delClass(req.body,res)
})

router.get('/parent/:id', (req, res) => {
  classApi.getParentList(req.params.id)
	// console.log(result)
	.then((result) => {
		// 返回对象数组
		if(result){
			let data = result.map(item => item.dataValues) 
			res.json({
				code : 200,
				msg : "已找到所有父类信息",
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
  classApi.queryById(req.params.id)
	.then((result) => {
		// 返回对象数组
		if(result[0].dataValues){
			res.json({
				code:200,
				msg:"已找到该类",
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

router.post('/',(req, res) => {
  classApi.add(req.body)
	.then((result) => {
		// 返回对象
		if(result.dataValues){
			res.json({
				code : 200,
				msg : "新建类信息成功",
				data : result.dataValues
			})
		}else{
			res.json({
				code : 488,
				msg : "新建类信息失败"
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
  classApi.update(req.body)
	.then((result) => {
		console.log(result)
		// 返回对象数组
		if(result){
			res.json({
				code : 200,
				msg : "已更新该类",
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
  classApi.del(req.params.id)
	.then((result) => {
		// 返回对象数组
		if(result){
			res.json({
				code : 200,
				msg : "已删除该类",
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
