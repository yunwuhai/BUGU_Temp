/*
 * @Description: 路由模块化 在此处统一调用
 * @version: 1.0.0
 * @Author: WPO
 * @Date: 2022-04-08 15:12:03
 * @LastEditors: WPO
 * @LastEditTime: 2022-04-13 02:08:22
 */

const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.send('Hello World!');
});

router.use('/tree',require('./tree'))

router.use('/userInfo',require('./userInfo'))
router.use('/entrance',require('./entrance'))
router.use('/component',require('./component'))
router.use('/engineering',require('./engineering'))
router.use('/class',require('./class'))
router.use('/method',require('./method'))
router.use('/chip',require('./chip'))
router.use('/data',require('./data'))

module.exports = router;