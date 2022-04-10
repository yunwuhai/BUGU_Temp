/*
 * @Description: 路由模块化 在此处统一调用
 * @version: 1.0.0
 * @Author: WPO
 * @Date: 2022-04-08 15:12:03
 * @LastEditors: WPO
 * @LastEditTime: 2022-04-10 01:30:01
 */

const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.send('Hello World!');
});

router.use('/user',require('./userInfo'))
router.use('/entrance',require('./entrance'))
router.use('/project',require('./projects'))

module.exports = router;