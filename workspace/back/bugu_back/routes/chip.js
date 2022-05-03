/*
 * @Description: 芯片操作的路由
 * @version: 1.0.0
 * @Author: WPO
 * @Date: 2022-04-11 10:47:52
 * @LastEditors: WPO
 * @LastEditTime: 2022-04-27 02:07:12
 */

const express = require('express');
const router = express.Router();
const chipApi = require('../dao/api/chips')

router.get('/', (req, res) => {
  chipApi.queryAll()
	.then((result) => {
		// 返回对象数组
		if(result){
			let data = result.map(item => item.dataValues) 
			res.json({
				code : 200,
				msg : "已找到所有芯片信息",
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
  chipApi.queryById(req.params.id)
	.then((result) => {
		// 返回对象数组
		if(result[0].dataValues){
			res.json({
				code:200,
				msg:"已找到该芯片",
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
  chipApi.add(req.body)
	.then((result) => {
		// 返回对象
		if(result.dataValues){
			res.json({
				code : 200,
				msg : "新建芯片信息成功",
				data : result.dataValues
			})
		}else{
			res.json({
				code : 488,
				msg : "新建芯片信息失败"
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
  chipApi.update(req.body)
	.then((result) => {
		console.log(result)
		// 返回对象数组
		if(result){
			res.json({
				code : 200,
				msg : "已更新该芯片",
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
  chipApi.del(req.params.id)
	.then((result) => {
		// 返回对象数组
		if(result){
			res.json({
				code : 200,
				msg : "已删除该芯片",
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