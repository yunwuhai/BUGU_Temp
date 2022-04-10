/*
 * @Description: 项目信息的路由接口
 * @version: 1.0.0
 * @Author: WPO
 * @Date: 2022-04-10 01:27:33
 * @LastEditors: WPO
 * @LastEditTime: 2022-04-10 13:12:37
 */

const express = require('express');
const router = express.Router();
const dbApi = require('../sql/dbApi')

/* 工程项目 */
router.post('/engineerings', (req, res, next) => {
	dbApi.dbInsert('engineerings',req.body,res,next);
})


/* 组件项目 */
router.post('/components',(req, res, next) => {
  dbApi.dbInsert('userInfo',req.body,res,next)
})

router.get('/components/:id',() => {

})
router.get('/components/:id',() => {

})

module.exports = router