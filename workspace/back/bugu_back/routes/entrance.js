/*
 * @Description: 注册登录得路由
 * @version: 1.0.0
 * @Author: WPO
 * @Date: 2022-04-09 08:54:31
 * @LastEditors: WPO
 * @LastEditTime: 2022-05-02 01:49:52
 */

const express = require('express');
const router = express.Router();
const userApi = require('../dao/api/userInfo')
const {setToken} = require('../utils/token')

router.post('/login', (req, res) => {
	// console.log(req.body)
  userApi.login(req.body)
	.then((result) => {
		// 返回对象数组
		// console.log(result)
		if(result.length){
			if(result[0].dataValues){
				setToken(result[0].dataValues.id).then((token) => {
					res.json({
						code : 200,
						msg : "登陆成功",
						data : {
							token:token,
							userInfo:result[0].dataValues
						}
					})
				})
		}
		}else{
			res.json({
				code : 488,
				msg : "用户名或密码错误",
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

router.post('/register',(req, res) => {
  userApi.add(req.body)
	.then((result) => {
		// 返回对象
		if(result.dataValues){
			res.json({
				code : 200,
				msg : "注册成功",
				data : result.dataValues
			})
		}else{
			res.json({
				code : 488,
				msg : "注册失败"
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

module.exports = router