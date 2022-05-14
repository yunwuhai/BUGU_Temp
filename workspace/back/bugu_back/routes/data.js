/*
 * @Description: 数据操作的路由
 * @version: 1.0.0
 * @Author: WPO
 * @Date: 2022-04-13 01:57:22
 * @LastEditors: WPO
 * @LastEditTime: 2022-05-11 02:41:50
 */

const express = require('express');
const router = express.Router();
const dataApi = require('../dao/api/data')

router.get('/type/:id/:type', (req, res) => {
  dataApi.getInOrOut({id:req.params.id,type:req.params.type})
	.then((result) => {
		// console.log(result)
		if(result.length){
			let data = result.map(item => item.dataValues) 
			res.json({
			code : 200,
			msg : "已找到所有数据信息",
			data : data
			})
		}else{
			res.json({
			code : 489,
			msg : "未找到信息"
		})
	}
	})
	.catch((err) => {
		// console.log(err)
		res.json({
		code : 587,
		msg : '错误信息' + err
		})
	})
})

router.get('/engin/:uid/:eid',(req,res) => {
	dataApi.queryByEngin({userId:req.params.uid,engineeringIds:req.params.eid})
	.then((result) => {
		// console.log(result)
		if(result.length){
			let data = result.map(item => item.dataValues) 
			res.json({
			code : 200,
			msg : "已找到所有数据信息",
			data : data
			})
		}else{
			res.json({
			code : 489,
			msg : "未找到信息"
		})
	}
	})
	.catch((err) => {
		// console.log(err)
		res.json({
		code : 587,
		msg : '错误信息' + err
		})
	})
})

router.get('/class/:uid/:cid',(req,res) => {
	dataApi.queryByClass({userId:req.params.uid,classId:req.params.cid})
	.then((result) => {
		if(result.length){
			let data = result.map(item => item.dataValues) 
			res.json({
			code : 200,
			msg : "已找到所有数据信息",
			data : data
			})
		}else{
			res.json({
			code : 489,
			msg : "未找到信息"
		})
	}
	})
	.catch((err) => {
		// console.log(err)
		res.json({
		code : 587,
		msg : '错误信息' + err
		})
	})
})

router.get('/parent/:id', (req, res) => {
	// console.log(req.params.id);
  dataApi.getParentDatas(req.params.id)
	.then((result) => {
		// 返回对象数组
		if(result){
			let data = result.map(item => item.dataValues) 
			res.json({
				code : 200,
				msg : "已找到所有数据信息",
				data : data
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

router.get('/', (req, res) => {
  dataApi.queryAll()
	.then((result) => {
		// 返回对象数组
		if(result){
			let data = result.map(item => item.dataValues) 
			res.json({
				code : 200,
				msg : "已找到所有数据信息",
				data : data
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
  dataApi.queryById(req.params.id)
	.then((result) => {
		// 返回对象数组
		if(result[0].dataValues){
			res.json({
				code:200,
				msg:"已找到该数据",
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
  dataApi.add(req.body)
	.then((result) => {
		// 返回对象
		if(result.dataValues){
			res.json({
				code : 200,
				msg : "新建数据信息成功",
				data : result.dataValues
			})
		}else{
			res.json({
				code : 488,
				msg : "新建数据信息失败"
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
  dataApi.update(req.body)
	.then((result) => {
		// console.log(result)
		// 返回对象数组
		if(result){
			res.json({
				code : 200,
				msg : "已更新该数据",
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
  dataApi.del(req.params.id)
	.then((result) => {
		// 返回删除的条数
		if(result){
			res.json({
				code : 200,
				msg : "已删除该数据",
				data : result
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