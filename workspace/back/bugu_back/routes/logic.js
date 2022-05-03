/*
 * @Description: 编译功能路由
 * @version: 1.0.0
 * @Author: WPO
 * @Date: 2022-04-23 15:58:23
 * @LastEditors: WPO
 * @LastEditTime: 2022-04-26 22:37:56
 */

const express = require('express');
const router = express.Router();
const fileApi = require('../service/desFile')

// 获取逻辑
router.get('/', (req, res) => {
	// console.log(req.query)
  fileApi.readLogic(req.query,res)
})

// 更新逻辑
router.put('/',(req, res) => {
	// console.log(req.body)
  fileApi.writeLogic(req.body, res)
})

// 删除逻辑
router.delete('/',(req, res) => {
	// console.log(req.body)
  fileApi.writeLogic(req.body, res)
})

// 新建逻辑
router.post('/',(req, res) => {
	// console.log(req.body)
  fileApi.writeLogic(req.body, res)
})

module.exports = router