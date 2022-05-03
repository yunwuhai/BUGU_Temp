/*
 * @Description: 下载文件路由
 * @version: 1.0.0
 * @Author: WPO
 * @Date: 2022-04-28 11:08:58
 * @LastEditors: WPO
 * @LastEditTime: 2022-05-01 19:55:44
 */

const express = require('express');
const router = express.Router();
const compress = require('../service/compile')

router.get('/exe/:id',async(req,res) => {
	// 解析 运行makefile
	await compress.getSourceZip('Make_STM32_Test_1')
	res.download('./files/zipFile/Make_STM32_Test_1_'+'EXE'+'.zip','Make_STM32_Test_1_EXE',err => {
		if(err){
			console.error(err)
		}else{
			console.log("下载源码成功")
		}
	})
})

router.get('/source/:id',async(req,res) => {
	//解析描述信息
	
	// console.log(req)
	await compress.getSourceZip('Make_STM32_Test_1')
	res.download('./files/zipFile/Make_STM32_Test_1_'+'Source'+'.zip','Make_STM32_Test_1_Source',err => {
		if(err){
			console.error(err)
		}else{
			console.log("下载源码成功")
		}
	})
})
module.exports = router