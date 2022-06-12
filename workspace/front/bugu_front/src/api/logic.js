/*
 * @Description: 文件操作 编译功能的接口
 * @version: 1.0.0
 * @Author: WPO
 * @Date: 2022-04-23 17:11:51
 * @LastEditors: WPO
 * @LastEditTime: 2022-04-26 22:02:51
 */

import { requestByPost,requestByPut,requestByDelete,requestByGet } from '@/utils/request'

const logicApi = {
	getLogic: (params) => requestByGet('/logic',params),
	updateLogic: (params) => requestByPut('/logic',params),
  addLogic: (params) => requestByPost('/logic',params),
  deleteLogic: (params) => requestByDelete('/logic',params),
}
export default logicApi