/*
 * @Description: 下载文件路由
 * @version: 1.0.0
 * @Author: WPO
 * @Date: 2022-04-28 11:08:58
 * @LastEditors: WPO
 * @LastEditTime: 2022-05-13 20:53:18
 */

const express = require('express');
const router = express.Router();
const compress = require('../service/compile')
const desApi = require('../service/desFile')
const proDir =  require('../service/proDir')
const path = require('path')
const fs = require('fs-extra')
const cmd = require('../service/cmd')

const createProDir = async(eid) => {
	// 解析描述信息
	const desFile = await desApi.getDesFile(eid)
	// 构建项目目录
	await proDir.createProDir(desFile)
	const dirName =  'Project_' + desFile.userId + '_' + desFile.projectToken + '_' + desFile.projectId
	return dirName
}

router.get('/exe/:id',async(req,res) => {
	// 解析描述信息
	const dirName =  await createProDir(req.params.id)
	// 编译Makefile
	if(+req.params.id === 90){
		cmd.make('F411_Make_Test')
		fs.copySync(path.join(__dirname,'../files/source/F411_Make_Test/build'),path.join(__dirname,'../files/source',dirName,'build'))
	}else{
		cmd.make(dirName)
	}
	await compress.getExeZip(dirName)
	let downloadPath = path.join(__dirname,'../files/zipFile', dirName +'_EXE.zip')
	res.download(downloadPath, dirName +'_EXE', err => {
		if(err){
			console.error(err)
		}else{
			console.log("下载可执行文件成功")
			fs.removeSync(downloadPath)
		}
	})
})

router.get('/source/:id',async(req,res) => {
	const dirName =  await createProDir(req.params.id)
	if(+req.params.id === 90){
		res.download(path.join(__dirname,'../files/zipFile', dirName +'_Source.zip'), dirName +'_Source', err => {
			if(err){
				console.error(err)
			}else{
				console.log("下载源码成功")
				// fs.removeSync(downloadPath)
			}
		})
	}else{
		// 解析描述文件 和 构建项目目录
  // 压缩源码文件
	await compress.getSourceZip(dirName)
	const downloadPath = path.join(__dirname,'../files/zipFile', dirName +'_Source.zip')
	res.download(downloadPath, dirName +'_Source', err => {
		if(err){
			console.error(err)
		}else{
			console.log("下载源码成功")
			fs.removeSync(downloadPath)
		}
	})
	}
})
module.exports = router