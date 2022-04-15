/*
 * @Description: 树形菜单路由
 * @version: 1.0.0
 * @Author: WPO
 * @Date: 2022-04-11 11:14:24
 * @LastEditors: WPO
 * @LastEditTime: 2022-04-11 17:37:16
 */

const express = require('express');
const router = express.Router();
const tree = require('../service/tree')

router.get('/:uid/:eid', async(req, res) => {
	// console.log(req.body)
 let data = await tree.getTree(req.params.uid,req.params.eid)
//  console.log(data)
 if(data.length){
	 res.json({
		 code : 200,
		 msg : "树形菜单获取成功",
		 data : data
	 })
 }else{
		res.json({
			code : 587,
			msg : "树形菜单获取失败",
	})
 }
})

module.exports = router