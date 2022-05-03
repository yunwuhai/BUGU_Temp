/*
 * @Description: 新建工程的操作
 * @version: 1.0.0
 * @Author: WPO
 * @Date: 2022-04-11 15:55:32
 * @LastEditors: WPO
 * @LastEditTime: 2022-05-03 20:14:55
 */

const enginApi = require('../dao/api/engineerings')
const compApi = require('../dao/api/components')
const classApi = require('../dao/api/classes')
const methodApi = require('../dao/api/methods')
const fs = require('fs')

const createDes = async(req,engin,ids) => {
	// let engin = await enginApi.add(req)
	let eid = engin.dataValues.id + ""
	let eToken = engin.dataValues.token
	let uid = req.userId
	const newFile = './files/desFiles/des_'+eid+'.json'
	fs.copyFileSync('./files/desFiles/des_template.json', newFile)
	const fileResult =JSON.parse(fs.readFileSync(newFile,'utf8'));
	fileResult.userId = uid
	fileResult.projectId = +eid
	fileResult.projectToken = eToken
	fileResult.classes[0].classId = ids[0]
	fileResult.classes[0].methods[0].methodId = ids[1]
	fs.writeFileSync(newFile, JSON.stringify(fileResult, null, 2))
}

const creatEngin = async(req) => {
	let engin = await enginApi.add(req)
	let enginId = engin.dataValues.id + ""
	let comp = await compApi.add({
		userId : req.userId,
		name : "核心组件",
		author: req.author,
		engineeringIds: enginId,
		token : "main",
		type : "0",
		description : req.name + "的核心组件"
	})
	
	let clas = await classApi.add({
		userId : req.userId,
		componentId :comp.dataValues.id, 
		engineeringIds: enginId,
		name : "核心类",
		author: req.author,
		token : "main",
		type : "0",
		chipId : req.chipId,
		description : req.name + "的核心类"
	})
	let method = await methodApi.add({
		userId : req.userId,
		classId : clas.dataValues.id, 
		engineeringIds: enginId,
		name : "核心方法",
		author: req.author,
		token : "main",
		type : "0",
		description : req.name + "的核心方法"
	})
	await methodApi.add({
		userId : req.userId,
		classId : clas.dataValues.id, 
		engineeringIds: enginId,
		name : "核心方法",
		author: req.author,
		token : "main",
		type : "6",
		description : req.name + "核心方法的实现"
	})
	createDes(req,engin,[clas.id,method.id])
	return engin
}

module.exports = {
	creatEngin,
	createDes
}