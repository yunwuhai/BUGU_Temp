/*
 * @Description: 方法操作路由
 * @version: 1.0.0
 * @Author: WPO
 * @Date: 2022-04-11 10:43:43
 * @LastEditors: WPO
 * @LastEditTime: 2022-05-03 03:24:47
 */

const express = require('express');
const router = express.Router();
const methodApi = require('../dao/api/methods')
const desApi = require('../service/desFile')
const dataApi = require('../dao/api/data')

router.get('/', (req, res) => {
  methodApi.queryAll()
	.then((result) => {
		// 返回对象数组
		if(result){
			let data = result.map(item => item.dataValues) 
			res.json({
				code : 200,
				msg : "已找到所有方法信息",
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
	desApi.addMethod(req.body,res)
})

router.delete('/des', (req, res) => {
	// console.log(req.body)
	desApi.delMethod(req.body,res)
})

router.delete('/desall', (req, res) => {
	// console.log(req.body)
	desApi.delMethodAll(req.body,res)
})

router.get('/:id', (req, res) => {
  methodApi.queryById(req.params.id)
	.then((result) => {
		// 返回对象数组
		if(result[0].dataValues){
			res.json({
				code:200,
				msg:"已找到该方法",
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
  methodApi.add(req.body)
	.then((result) => {
		// 返回对象
		if(result.dataValues){
			res.json({
				code : 200,
				msg : "新建方法信息成功",
				data : result.dataValues
			})
		}else{
			res.json({
				code : 488,
				msg : "新建方法信息失败"
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
  methodApi.update(req.body)
	.then((result) => {
		// console.log(result)
		// 返回对象数组
		if(result){
			res.json({
				code : 200,
				msg : "已更新该方法",
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

router.put('/overload', (req, res) => {
	console.log(req.body)
  methodApi.updateOverload(req.body)
	.then((result) => {
		// 返回对象数组
		if(result){
			res.json({
				code : 200,
				msg : "已更新该方法对应的重载",
				data : result
			})
		}else{
			res.json({
				code:489,
				msg : "重载更新失败"
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

router.delete('/', (req, res) => {
	// console.log(req.body)
  methodApi.del(req.body)
	.then((result) => {
		// 返回删除条数
		if(result){
			res.json({
				code : 200,
				msg : "已删除该方法以及重载"+ result+"个",
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

router.delete('/overload/:id', (req, res) => {
	// console.log(req.body)
	dataApi.delByMid(req.params.id)
	.catch(err => {
		if(err){
			console.error(err)
		}
	})
  methodApi.delOverload(req.params.id)
	.then((result) => {
		// 返回对象数组
		if(result){
			res.json({
				code : 200,
				msg : "已删除该重载",
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