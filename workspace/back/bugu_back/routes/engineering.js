/*
 * @Description: 工程项目信息路由
 * @version: 1.0.0
 * @Author: WPO
 * @Date: 2022-04-10 23:08:49
 * @LastEditors: WPO
 * @LastEditTime: 2022-04-11 18:37:59
 */

const express = require('express');
const router = express.Router();
const enginApi = require('../dao/api/engineerings')
const init = require('../service/init')

router.post('/init', (req, res) => {
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
  enginApi.update(req.body)
	.then((result) => {
		console.log(result)
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

router.delete('/:id', (req, res) => {
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