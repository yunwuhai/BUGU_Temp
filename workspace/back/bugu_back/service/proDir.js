/*
 * @Description: 文件操作测试
 * @version: 1.0.0
 * @Author: WPO
 * @Date: 2022-05-03 16:53:53
 * @LastEditors: WPO
 * @LastEditTime: 2022-05-13 15:42:25
 */

const fs = require('fs-extra')
const path = require('path')
const compApi = require('../dao/api/components')
const classApi = require('../dao/api/classes')
const chipApi = require('../dao/api/chips')

// 组成所有组件中所有类的方法路径
let C_SOURCES = ""

// 返回类id组成的数组
const getClasses = async(cid) => {
	let classInfo = await classApi.getByCid(cid,['id'])
	let ids = await classInfo.map(item => item.dataValues.id)
	return ids
} 

// 获取相对路径
const getRelative = (from,to) => {
	let Path = path.relative(from,to).replace(/\\/g, '/')
	return Path
}

// 按行修改文件
const editFile = (path, line, content) => {
	// 空行为空字符串
	let Content = fs.readFileSync(path,'utf-8').split(/\r\n|\n|\r/gm)
	Content[line] = content 
	fs.writeFileSync(path,Content.join('\r\n'),'utf-8')
}

// 按行追加文件内容
const addFile = (path, line, content) => {
	// 空行为空字符串
	let Content = fs.readFileSync(path,'utf-8').split(/\r\n|\n|\r/gm)
	Content[line] += content 
	fs.writeFileSync(path,Content.join('\r\n'),'utf-8')
}

// 构建项目目录
const createProDir = async(desFile) => {
	const classes = desFile.classes
	const projectName = 'Project_' + desFile.userId + '_' + desFile.projectToken + '_' + desFile.projectId
	const distPath = path.join(__dirname, '../files/source', projectName)  
	const comps = await compApi.getByEid(desFile.projectId,['id','token'])
	const compsInfo = comps.map(item => item.dataValues)
	// 获取芯片信息
	const chip = await chipApi.queryById(desFile.chipId)
	const chipInfo = chip[0].dataValues

	fs.emptyDirSync(distPath)
	fs.rmdirSync(distPath)
	// 一级目录 项目名
	fs.mkdirSync(distPath)
	fs.writeFileSync(path.join(distPath, 'README.txt'), desFile.projectToken + "的项目框架")
	// 二级目录 用户组件和外部组件
	fs.mkdirSync(path.join(distPath, 'CORE'))
	fs.writeFileSync(path.join(distPath, 'CORE/README.txt'), "该文件夹为项目中用到的外部组件")
	fs.mkdirSync(path.join(distPath, 'USER'))
	fs.writeFileSync(path.join(distPath, 'USER/README.txt'), "该文件夹为项目中自定义的组件")
	fs.mkdirSync(path.join(distPath, 'build'))
	fs.writeFileSync(path.join(distPath, 'build/README.txt'), "该文件夹为编译结果存放处")
	fs.mkdirSync(path.join(distPath, 'SDK'))
	fs.writeFileSync(path.join(distPath, 'SDK/README.txt'), "该文件夹存放C组件导入的SDK包")
	fs.mkdirSync(path.join(distPath, 'TOOLS'))
	fs.copySync(path.join(__dirname, '../files/Tools'),path.join(distPath, 'TOOLS'))
	// fs.writeFileSync(path.join(distPath, 'TOOLS/README.txt'), "该文件夹存放编译工具链")

	// 复制.s启动文件
	let startPath = path.join(distPath,'startup_stm32f401xc.s')
	fs.copyFileSync(path.join(__dirname, '../files/startup_stm32f401xc.s'), startPath)
	
	// 复制Makefile模板
	let makePath = path.join(distPath,'Makefile')
	fs.copyFileSync(path.join(__dirname, '../files/Makefile'), makePath)
	// Makefile中的项目名修改
	editFile(makePath, 0, "TARGET = " + projectName)
	// Makefile中CPU架构的修改
	editFile(makePath, 21, "CPU = -mcpu=" + chipInfo.CPU)
	// Makefile中FPU架构的修改
	editFile(makePath, 22, "FPU = -mfpu=" + chipInfo.FPU)
	// Makefile中浮点处理的修改
	editFile(makePath, 23, "FLOAT-ABI = -mfloat-abi=" + chipInfo.FLOAT_ABI)
	
	// 复制ld链接脚本
	let ldPath = path.join(distPath,'STM32F401CCUx_FLASH.ld')
	fs.copyFileSync(path.join(__dirname, '../files/STM32F401CCUx_FLASH.ld'), ldPath)
	//修改ld文件中的堆栈大小
	editFile(ldPath, 4, "_Min_Heap_Size = " + desFile.heap)
	editFile(ldPath, 5, "_Min_Stack_Size = " + desFile.stack)
	// 获取ld文件的相对路径
	let ldRelative = getRelative(makePath,ldPath).slice(3)
	
	// 修改Makefile中的链接脚本路径
	editFile(makePath, 41, "LDSCRIPT = " + ldRelative)
	
	// CORE

	// USER
	compsInfo.forEach(item => {
		// 三级目录 组件名
		let compName = 'Component_' + desFile.userId + '_' + item.id + '_' + item.token
		fs.mkdirSync(path.join(distPath,'USER', compName))
		fs.writeFileSync(path.join(distPath, 'USER', compName, 'README.txt'), "该文件夹为" + item.token + "的组件结构")
		// 四级目录 类和下级组件
		fs.mkdirSync(path.join(distPath, 'USER', compName, 'CLASS'))
		fs.writeFileSync(path.join(distPath, 'USER', compName, 'CLASS/README.txt'), "该文件夹为" + item.token + "的所有类")
		fs.mkdirSync(path.join(distPath, 'USER', compName, 'SUB'))
		fs.writeFileSync(path.join(distPath, 'USER', compName, 'SUB/README.txt'), "该文件夹为" + item.token + "的所有下级组件")
		// 得到此时组件下的所有类id
		getClasses(item.id)
		.then(res => {
			classes.forEach(item1 => {
				// 判断此时的类是否属于该组件
				if(res.indexOf(item1.classId) !== -1){
					// 五级目录 类名
					let className = 'Class_' + item1.classId + '_' + item1.classToken
					fs.mkdirSync(path.join(distPath, 'USER', compName, 'CLASS', className))
					fs.writeFileSync(path.join(distPath, 'USER', compName, 'CLASS', className, 'README.txt'), "该文件夹为" + item1.classToken + "的类结构")
					// 编写类对应的h文件
					let contentH = "// 这是" + className + '的h文件'
					const hPath = path.join(distPath, 'USER', compName, 'CLASS', className, className + '.h')
					fs.writeFileSync(hPath, contentH)
					// 六级目录 c文件
					fs.mkdirSync(path.join(distPath, 'USER', compName, 'CLASS', className, 'METHOD'))
					fs.writeFileSync(path.join(distPath, 'USER', compName, 'CLASS', className, 'METHOD/README.txt'), "该文件夹为" + item1.classToken + "的方法实现")
					item1.methods.forEach(item2 => {
						let methodName = 'Method_' + item2.methodId + '_' + item2.methodToken
						let conentC = "// 这是" + methodName + '的实现'
						const cPath = path.join(distPath, 'USER', compName, 'CLASS', className, 'METHOD', methodName + '.c')
						fs.writeFileSync(cPath, conentC)

						// 获取c文件的相对路径
						let relativeC = getRelative(makePath, cPath).slice(3)
						// console.log("relative" , relativeC)
						// 组成该组件下的c资源路径
						C_SOURCES = C_SOURCES + relativeC + " " 
					})
				}
			})
			// Makefile中的C资源路径添加
			addFile(makePath, 7, " " + C_SOURCES)
			C_SOURCES = ""
		})
	})
}

module.exports = {
	createProDir
}