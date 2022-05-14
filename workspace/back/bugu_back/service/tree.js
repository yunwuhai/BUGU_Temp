/*
 * @Description: 形成树形菜单
 * @version: 1.0.0
 * @Author: WPO
 * @Date: 2022-04-11 10:55:11
 * @LastEditors: WPO
 * @LastEditTime: 2022-05-11 20:59:43
 */

const treeKey = require('nanoid')
const compApi = require('../dao/api/components')
const classApi = require('../dao/api/classes')
const methodApi = require('../dao/api/methods')
const cols = ['id','name','engineeringIds', 'author', 'type', 'description','token']
const cols1 = ['id','componentId', 'engineeringIds', 'name', 'author', 'type', 'description','token']
const cols2 = ['id', 'classId', 'name', 'engineeringIds', 'author', 'type', 'description','token']

const findDataObj = (obj) => {
	for(let i = 0; i < obj.length; i++){
		if(obj[i].type === '4'){
			return true
		}else{
			continue
		}
	}
}

/**
 * @description:    通过查询用户id得到树形菜单需要的对象数组
 * @param {*} uid		用户id
 * @return {*}      树形对象数组
 */
const getTree = async (uid,eid) => {
	// 获取树节点信息
	let first = await compApi.treeNode(uid,cols)
	let second = await classApi.treeNode(uid,cols1)
	let third = await methodApi.treeNode(uid,cols2,['name','ASC'])
	let firstNode = first.map(item => item.dataValues)
	let secondNode = second.map(item => item.dataValues)
	let thirdNode = third.map(item => item.dataValues)

	let res = []
	let last = {} 
	// let contruct = 0
	let e = eid.toString()

	// 组件
	firstNode.map(i => { 
		if(i.engineeringIds.indexOf(e) > -1){
			i.key = treeKey.nanoid()
			i.title = i.name
			i.level = 1
			i.children = []
			// 类
			secondNode.map(j => {
				if(j.engineeringIds.indexOf(e) > -1){
					j.key = treeKey.nanoid()
					j.title = j.name
					j.level = 2
					j.children = []
					
					// 方法 属性
					thirdNode.map(k =>{
						if(k.engineeringIds.indexOf(e) > -1){
							k.key = treeKey.nanoid()
							k.title = k.name
							if(j.id === k.classId){
								//构造方法
								if(k.type === '3'){
									k.level = 3
									if(j.type !== "1"){
										j.children.push({
											title: '数据对象',
											key: treeKey.nanoid(),
											type: "4",
											author: j.author,
											classId : k.classId,
											level: 3,
											description: j.name + "的数据对象",
										})
									}
									j.children.push(k)
								}else{
									// 是否是重载
									if(k.type !== '5' && k.type !== '6'){
										k.level = 3
										k.children = []
										last = k
										// console.log(findDataObj(j.children));
										if(j.type !== "1" && (j.type === '2' || j.type === "0") && !findDataObj(j.children)){
											j.children.push({
												title: '数据对象',
												key: treeKey.nanoid(),
												type: "4",
												author: j.author,
												classId : k.classId,
												level: 3,
												description: j.name + "的数据对象",
											})
										}
										j.children.push(k)
									}
									if((k.type === '5' || k.type === '6') && k.name === last.name){
										k.level = 4
										last.children.push(k)
									}
								}
							}
						}
					})
					if(i.id === j.componentId){
						i.children.push(j)
					}
				}
			})
			res.push(i)
		}
	});
return res;
	
}

module.exports = {
	getTree
}