/*
 * @Description: 测试
 * @version: 1.0.0
 * @Author: WPO
 * @Date: 2022-05-04 02:33:43
 * @LastEditors: WPO
 * @LastEditTime: 2022-05-13 15:18:50
 */

const fs = require('fs-extra')
const desApi = require('./desFile')
const path = require('path')
const chipApi = require('../dao/api/chips')
const cmd = require('./cmd')
// const getChip = async(chipId) => {
// chipApi.queryById(chipId)
// .then(res => {
// 	console.log(res[0].dataValues)
// })
// }
cmd.make('F411_Make_Test')
// getChip(1)


// // 获取相对路径
// const getRelative = (from,to) => {
// 	let Path = path.relative(from,to).replace(/\\/g, '/')
// 	return Path
// }

// let b = path.join(__dirname,'../files/source/Project_2_pro_50/STM32F401CCUx_FLASH.ld')
// let c = path.join(__dirname,'../files/source/Project_2_pro_50/Makefile')
// let relative = getRelative(c,b)
// // fs.writeFileSync('../files/test.txt',relative)


