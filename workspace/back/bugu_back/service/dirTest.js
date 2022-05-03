/*
 * @Description: 文件操作测试
 * @version: 1.0.0
 * @Author: WPO
 * @Date: 2022-05-03 16:53:53
 * @LastEditors: WPO
 * @LastEditTime: 2022-05-04 01:40:00
 */

const fs = require('fs-extra')
const desApi = require('./desFile')
const compApi = require('../dao/api/components')
const classApi = require('../dao/api/classes')

// 复制目录
const copyDir = (src, dist, eid, callback) => {

  fs.access(dist, (err) => {
    if(err){
      // 目录不存在时创建目录
      fs.mkdirSync(dist);
    }
			_copy(null, src, dist);
  });

const _copy = (err, src, dist) => {
  if(err){
    callback(err);
	} else {
		// 读取目录
    fs.readdir(src, (err, paths) => {
    	if(err){
        callback(err)
      } else {
        paths.forEach((path) => {
          let _src = src + '/' + path;
          let _dist = dist + '/' + path;
          fs.stat(_src, (err, stat) => {
            if(err){
                callback(err);
              } else {
                // 判断是文件还是目录
                if(stat.isFile()) {
                  fs.writeFileSync(_dist, fs.readFileSync(_src));
                } else if(stat.isDirectory()) {
                  // 当是目录是，递归复制
                  copyDir(_src, _dist, callback)
                }
              }
            })
          })
        }
      })
    }
  }
}

const getClasses = async(cid) => {
	let classInfo = await classApi.getByCid(cid,['id'])
	let ids = await classInfo.map(item => item.dataValues.id)
	// console.log(ids);
	// 返回类id组成的数组
	return ids
} 

// 构建项目目录
const createProDir = async(eid) => {
	const desFile = await desApi.getDesFile(eid)
	const classes = desFile.classes
	const distPath =  '../files/source/' + desFile.userId + '_' + desFile.projectToken + '_' + desFile.projectId
	const comps = await compApi.getByEid(eid,['id','token'])
	const compsInfo = comps.map(item => item.dataValues)
	const compTokens = comps.map(item => item.dataValues.token)
	const compIds = comps.map(item => item.dataValues.id)
	// console.log(compTokens);
	// console.log(compIds);

	fs.emptyDirSync(distPath)
	fs.rmdirSync(distPath)
	fs.mkdirSync(distPath)
	// 二级目录 用户组件和系统组件
	fs.mkdirSync(distPath + '/Core')
	fs.mkdirSync(distPath + '/User')
	fs.mkdirSync(distPath + '/build')
	fs.mkdirSync(distPath + '/SDK')
	// 复制Makefile模板
	fs.copyFileSync('../files/Makefile',distPath + '/Makefile')
	compsInfo.forEach(item => {
		// 三级目录 组件名
		fs.mkdirSync(distPath + '/User/' + item.token)
		// 四级目录 类和下级组件
		fs.mkdirSync(distPath + '/User/' + item.token + '/Class')
		fs.mkdirSync(distPath + '/User/' + item.token + '/Sub')
		// 得到此时组件下的所有类id
		getClasses(item.id)
		.then(res => {
			console.log("id",res);
			classes.forEach(item1 => {
				console.log(item1.classId);
				// 判断此时的类是否属于该组件
				if(res.indexOf(item1.classId) !== -1){
					// 五级目录 类名
					let className = item1.classToken + '_' + item1.classId
					fs.mkdirSync(distPath + '/User/' + item.token + '/Class/' + className)
					// 编写类对应的h文件
					let contentH = "// 这是" + className + '的h文件'
					const hPath = distPath + '/User/' + item.token + '/Class/' + className + '/'
					fs.writeFileSync(hPath + className + '.h', contentH)
					// 六级目录 c文件
					fs.mkdirSync(distPath + '/User/' + item.token + '/Class/' + className + '/src')
					const cPath = distPath + '/User/' + item.token + '/Class/' + className + '/src/'
					item1.methods.forEach(item2 => {
						let methodName = item2.methodToken + '_' + item2.methodId
						let conentC = "// 这是" + methodName + '的实现'
						fs.writeFileSync(cPath + methodName + '.c', conentC)
					})
				}
			})
		})
	})
}

createProDir(50)