/*
 * @Description: 操作控制台
 * @version: 1.0.0
 * @Author: WPO
 * @Date: 2022-05-03 14:00:19
 * @LastEditors: WPO
 * @LastEditTime: 2022-05-03 17:29:29
 */

const cmdWin = require("node-cmd")
const	cmdLinux = require("child_process")
const os = require('os')


const make = () => {
	const osType = os.platform()
	switch(osType){
		case 'linux':

		case 'win32':
			// win环境下
			cmdWin.run(
				// 用&&隔开，用法是前面的命令运行成功才运行后面的命令，1命令&2命令，就是运行1命令没出错、运行成功才运行2命令。
				'cd ../files/source/Make_STM32_Test_1 && make',
				(err, data, stderr) => {
					console.log(err);
					console.log(data);
					console.log(stderr);
				}
			)
			break
	}
}
// win环境下
cmdWin.run(
	// 用&&隔开，用法是前面的命令运行成功才运行后面的命令，1命令&2命令，就是运行1命令没出错、运行成功才运行2命令。
	'cd ../files/source/Make_STM32_Test_1 && make',
	(err, data, stderr) => {
		console.log(err);
		console.log(data);
		console.log(stderr);
	}
)

module.exports = {
	make
}