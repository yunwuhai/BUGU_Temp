/*
 * @Description: 文件读写 编译
 * @version: 1.0.0
 * @Author: WPO
 * @Date: 2022-04-21 01:21:00
 * @LastEditors: WPO
 * @LastEditTime: 2022-05-13 18:46:37
 */

const compressing = require('compressing')
const fs = require('fs-extra')
const path = require('path')

// 压缩文件
const getSourceZip = async(fileName) => {
	// 进入指定项文件夹复制需要的源码文件夹
	let sourcePath = path.join(__dirname, '../files/zipFile', fileName + '_Source')	
	await	fs.copy(path.join(__dirname, '../files/source', fileName), sourcePath)
	// await	fs.copy(path.join(__dirname, '../files/source', fileName, 'CORE'), path.join(sourcePath, 'CORE'))
	// await	fs.copy(path.join(__dirname, '../files/source', fileName, 'USER'), path.join(sourcePath, 'USER'))
	// await fs.copy(path.join(__dirname, '../files/source', fileName, 'README.txt'), path.join(sourcePath, 'README.txt'))
	// 全空文件夹不会被压缩
	await compressing.zip.compressDir(sourcePath, sourcePath+'.zip')
	// 删除压缩后的文件夹
	fs.emptyDirSync(sourcePath)
	fs.rmdirSync(sourcePath)
}

const getExeZip = async(fileName) => {
	// 进入指定项文件夹复制需要的可执行文件
	let exePath = path.join(__dirname, '../files/zipFile', fileName + '_EXE')
	await	fs.copy(path.join(__dirname, '../files/source/F411_Make_Test/build/F411_Make_Test.bin'), path.join(exePath, fileName + '.bin'))
	await	fs.copy(path.join(__dirname, '../files/source/F411_Make_Test/build/F411_Make_Test.elf'), path.join(exePath, fileName + '.elf'))
	await	fs.copy(path.join(__dirname, '../files/source/F411_Make_Test/build/F411_Make_Test.hex'), path.join(exePath, fileName + '.hex'))
	//压缩文件
	await compressing.zip.compressDir(exePath,'./files/zipFile/'+fileName+'_EXE'+'.zip')
	fs.remove(exePath)
}

// 生成h文件

module.exports = {
	getSourceZip,
	getExeZip
}