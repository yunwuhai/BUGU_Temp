/*
 * @Description: 组件信息的路由接口
 * @version: 1.0.0
 * @Author: WPO
 * @Date: 2022-04-10 01:27:33
 * @LastEditors: WPO
 * @LastEditTime: 2022-05-12 01:34:01
 */

const express = require('express');
const router = express.Router();
const compApi = require('../dao/api/components')
const dataApi = require('../dao/api/data')
const methodApi = require('../dao/api/methods')
const classApi = require('../dao/api/classes')

router.get('/', (req, res) => {
  compApi.queryAll()
	.then((result) => {
		// 返回对象数组
		if(result){
			let data = result.map(item => item.dataValues) 
			res.json({
				code : 200,
				msg : "已找到所有组件信息",
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
  compApi.queryById(req.params.id)
	.then((result) => {
		// 返回对象数组
		if(result[0].dataValues){
			res.json({
				code:200,
				msg:"已找到该组件",
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
  compApi.add(req.body)
	.then((result) => {
		// 返回对象
		if(result.dataValues){
			res.json({
				code : 200,
				msg : "新建组件信息成功",
				data : result.dataValues
			})
		}else{
			res.json({
				code : 488,
				msg : "新建组件信息失败"
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
  compApi.update(req.body)
	.then((result) => {
		// console.log(result)
		// 返回对象数组
		if(result){
			res.json({
				code : 200,
				msg : "已更新该组件",
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

const delAll = async(id) =>{
	let result = await classApi.getByCid(id,['id'])
	let classIds = result.map(item => item.dataValues)
	// 删除组件下所有类对应的方法和属性信息
	// console.log(classIds);
	classIds.forEach(async(item) => {
		await methodApi.delByCid(item.id)
		await dataApi.delByCid(item.id)
	});
	await classApi.delByCom(id)
}

router.delete('/:id/:eid', (req, res) => {
	delAll(req.params.id)
	.catch(err => {
		if(err){
			console.error(err)
		}else{
			console.log("删除成功");
		}
	})
  compApi.del(req.params.id)
	.then((result) => {
		// 返回删除的条数
		if(result){
			res.json({
				code : 200,
				msg : "已删除该组件",
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