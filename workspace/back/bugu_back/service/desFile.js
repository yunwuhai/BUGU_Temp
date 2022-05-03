/*
 * @Description: 文件操作具体逻辑
 * @version: 1.0.0
 * @Author: WPO
 * @Date: 2022-04-26 17:18:04
 * @LastEditors: WPO
 * @LastEditTime: 2022-05-04 00:31:43
 */

const fs = require("fs")

// 读取整个描述文件的json对象
const getDesFile = (eid) => {
	let fileName = '../files/desFiles/des_' + eid + '.json'
	return JSON.parse(fs.readFileSync(fileName))
}

// 添加类
const addClass = (info,res) => {
	let fileName = './files/desFiles/des_' + info.eid + '.json'
	fs.readFile(fileName,(err,data) => {
		if(err){
			console.error(err)
		}else{
			let content = JSON.parse(data)
			// console.log("content",content);
			content.classes.push({
				classId : info.cid,
				classToken : info.cToken,
				methods : []
			})
			let Data =  JSON.stringify(content, null, 2); // 格式化json
			fs.writeFile(fileName, Data,(err) => {
				if (err){
					console.error(err)
				}
			});
		}
	})
}

// 删除类
const delClass = (info,res) => {
	let fileName = './files/desFiles/des_' + info.eid + '.json'
	fs.readFile(fileName,(err,data) => {
		if(err){
			console.error(err)
		}else{
			let content = JSON.parse(data)
			// console.log("content",content);
			for(let i = 0; i < content.classes.length; i++){
				if(content.classes[i].classId === info.cid){
					content.classes.splice(i, 1)
					let Data =  JSON.stringify(content, null, 2); // 格式化json
					fs.writeFile(fileName, Data,(err) => {
						if (err){
							console.error(err)
						}else{
							res.json({
								code:200,
								msg:'描述信息修改成功'
							})
						}
					});
					break
				}
			}
		}
	})
}

// 添加方法
const addMethod = (info,res) => {
	let fileName = './files/desFiles/des_' + info.eid + '.json'
	fs.readFile(fileName,(err,data) => {
		if(err){
			console.error(err)
		}else{
			let content = JSON.parse(data)
			// console.log("content",content);
			content.classes.find((item) => {
				if(item.classId === info.cid){
					item.methods.push({
						methodId : info.mid,
						methodToken : info.mToken,
						logic : []
					})
					let Data =  JSON.stringify(content, null, 2); // 格式化json
					fs.writeFile(fileName, Data,(err) => {
					if (err){
						console.error(err)
					}else{
						res.json({
							code:200,
							msg:'描述文件修改成功'
						})
					}
					});
					return true
				}
			}) 
			
		}
	})
}

// 删除方法
const delMethod = (info,res) => {
	let fileName = './files/desFiles/des_' + info.eid + '.json'
	fs.readFile(fileName,(err,data) => {
		if(err){
			console.error(err)
		}else{
			let content = JSON.parse(data)
			content.classes.find((item) => {
				if(item.classId === info.cid){
					for(let i = 0; i < item.methods.length; i++){
						// console.log(item.methods[i].methodId);
						if(item.methods[i].methodId === info.mid){
							item.methods.splice(i, 1)
							let Data =  JSON.stringify(content, null, 2); // 格式化json
							fs.writeFile(fileName, Data,(err) => {
								if (err){
									console.error(err)
								}else{
									res.json({
										code:200,
										msg:'描述信息修改成功'
									})
								}
							});
							break
						}
					
					}
					return true
				}
			}) 
			
		}
	})
}

// 删除所有方法
const delMethodAll = (info,res) => {
	let fileName = './files/desFiles/des_' + info.eid + '.json'
	fs.readFile(fileName,(err,data) => {
		if(err){
			console.error(err)
		}else{
			let content = JSON.parse(data)
			content.classes.find((item) => {
				if(item.classId === info.cid){
					for(let i = 0; i < item.methods.length; i++){
						// console.log(item.methods[i].methodId);
						if(item.methods[i].methodToken === info.mToken){
							item.methods.splice(i, 1)
							let Data =  JSON.stringify(content, null, 2); // 格式化json
							fs.writeFile(fileName, Data,(err) => {
								if (err){
									console.error(err)
								}else{
									res.json({
										code:200,
										msg:'描述信息修改成功'
									})
								}
							});
						}
					
					}
					return true
				}
			}) 
			
		}
	})
}

// 读取逻辑
const readLogic = (info,res) => {
	console.log(info)
	fs.readFile('./files/desFiles/des_' + info.eid + '.json', (err, data) => {
  	if (err){
			res.json({
				code : 587,
				msg : '读取失败：' + err
			})
			console.error(err)
			// throw err
		}else{
			let logic = []
			JSON.parse(data).classes.find((item) => {
				// console.log(item)
				if(item.classId === +info.cid){
					// console.log(1,item)
					item.methods.find(item1 =>{
						// console.log(item1)
						if(item1.methodId === +info.mid){
							logic = item1.logic
							return true
						}else{
							logic = []
							return false
						}
					})
				}
			})
			// console.log(logic)
			if(logic.length){
				res.json({
					code:200,
					msg:"已找到该方法的具体逻辑",
					data:logic
				})
			}else{
				res.json({
					code:489,
					msg : "未找到该方法的具体逻辑"
				})
			}
		}
	});
}

// 写入逻辑 新建、删除、修改逻辑时
const writeLogic = (info,res) => {
	let fileName = './files/desFiles/des_' + info.eid + '.json'
	fs.readFile(fileName,(err,data) => {
		if(err){
			console.error(err)
		}else{
			let content = JSON.parse(data)
			// console.log("content",content);
			content.classes.find((item) => {
				if(item.classId === info.cid){
					// console.log("class",item);
					item.methods.find((item1) => {
						if(item1.methodId === info.mid){
							// console.log("method",item1);
							for(let i = 0; i < info.data.length; i++){
								if(info.data[i].children !== undefined){
									if(info.data[i].children.length === 0){
										delete info.data[i].children
									}
								}
							}
							// console.log(info.data);
							item1.logic = info.data
							// console.log("contene",content);
							let Data =  JSON.stringify(content, null, 2); // 格式化json
							fs.writeFile(fileName, Data,(err) => {
								if (err){
									res.json({
										code : 587,
										msg : '写入失败' + err
									})
									console.error(err)
									// throw err
								}else{
									res.json({
										code:200,
										msg:"已成功修改",
										data:info.data			
									})
								}
							});
						}
					})
					return true
				}
			}) 
		}
	})
}

// 删除描述文件
const delDes = (eid,res) => {
	let fileName = './files/desFiles/des_' + eid + '.json'
	fs.unlinkSync(fileName)
}
 module.exports = {
	 getDesFile,
	 readLogic,
	 writeLogic,
	 addMethod,
	 delMethod,
	 delMethodAll,
	 addClass,
	 delClass,
	 delDes
 }

