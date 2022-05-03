/*
 * @Description: 文件读写 编译
 * @version: 1.0.0
 * @Author: WPO
 * @Date: 2022-04-21 01:21:00
 * @LastEditors: WPO
 * @LastEditTime: 2022-05-03 18:29:54
 */

const fs = require('fs')
const compressing = require('compressing')
const desApi = require('./desFile')

// const desFile = desApi.getDesFile()

// 压缩文件
const getSourceZip = async(fileName) => {
	// 进入指定项文件夹复制需要的源码文件夹

	await compressing.zip.compressDir('./files/source/'+fileName,'./files/zipFile/'+fileName+'_Source'+'.zip')
}

const getExeZip = async(fileName) => {
	// 进入指定项文件夹复制需要的可执行文件夹

	await compressing.zip.compressDir('./files/exe/'+fileName,'./files/zipFile/'+fileName+'_EXE'+'.zip')
}

// 生成h文件
module.exports = {
	getSourceZip,
	getExeZip
}