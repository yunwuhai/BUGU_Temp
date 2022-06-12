/*
 * @Description: 操作控制台
 * @version: 1.0.0
 * @Author: WPO
 * @Date: 2022-05-03 14:00:19
 * @LastEditors: WPO
 * @LastEditTime: 2022-05-13 15:23:15
 */

const cmdWin = require("node-cmd")
const path = require('path')
const	cmdLinux = require("child_process").exec
const os = require('os')

// 用&&隔开，用法是前面的命令运行成功才运行后面的命令，1命令&2命令，就是运行1命令没出错、运行成功才运行2命令。
const make = (fileName) => {
	const filePath = path.join(__dirname,'../files/source',fileName)
	const osType = os.platform()
	switch(osType){
		case 'linux':
			cmdLinux('cd '+ filePath + '&& make clean && make', (error, stdout, stderr) => {
        if(error){
          console.error(error);
        }else{
          console.log("success");
        }
    })
			break
		case 'win32':
			// win环境下
			cmdWin.run(
				'cd '+ filePath + '&& make clean && make',
				(err, data, stderr) => {
					console.log(err);
					console.log(data);
					console.log(stderr);
				}
			)
			break
	}
}

module.exports = {
	make
}