/*
 * @Description: 用户信息操作的相关接口
 * @version: 1.0.0
 * @Author: WPO
 * @Date: 2022-04-08 21:15:41
 * @LastEditors: WPO
 * @LastEditTime: 2022-04-09 22:42:35
 */

const express = require('express');
const router = express.Router();
const db = require('../sql/dbApi')
const table = 'userInfo'


router.get('/userInfo/:id',(req, res, next) =>{
	let sqlParam ={
		id:req.params.id
	}
	db.dbQueryById(table,sqlParam,res,next);
})

router.get('/userInfo',(req, res, next) =>{
	db.dbQueryById(table,sqlParam,res,next);
})

router.post('/userInfo',(req, res, next) =>{
	db.dbUpdate(table,sqlParam,res,next);
})

router.delete('/userInfo',(req, res, next) =>{
	db.dbDelete(table,sqlParam,res,next);
})

module.exports = router;

