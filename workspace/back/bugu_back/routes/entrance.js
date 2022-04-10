/*
 * @Description: 注册登录得路由
 * @version: 1.0.0
 * @Author: WPO
 * @Date: 2022-04-09 08:54:31
 * @LastEditors: WPO
 * @LastEditTime: 2022-04-10 02:40:27
 */

const express = require('express');
const router = express.Router();
const dbApi = require('../sql/dbApi')
const {setToken} = require('../utils/token')

router.post('/login', (req, res, next) => {
  dbApi.login('entrance',req.body,(err,result) => {
		if(result.length!==0){
			setToken(result.id).then((token) => {
				res.json({
					code:200,
					msg:"登陆成功",
					data:{
						token:token,
						userInfo:result
					}
				})
			})
		}else{
			res.json({
				code:401,
				msg:"用户名或密码错误",
			})
		}
	});
})

router.post('/register',(req, res, next) => {
  dbApi.dbInsert('userInfo',req.body,res,next)
})

module.exports = router