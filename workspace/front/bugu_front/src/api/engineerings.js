/*
 * @Description: 工程项目接口
 * @version: 1.0.0
 * @Author: WPO
 * @Date: 2022-04-10 01:37:31
 * @LastEditors: WPO
 * @LastEditTime: 2022-04-10 01:39:37
 */

import { requestByPost,requestByPut,requestByDelete } from '@/utils/request'

const engineeringApi = {
  add: (param) => requestByPost('/project/engineerings',param),
	update: (param) => requestByPut('/entrance/register', param),
  delete: (param) => requestByDelete('/entrance/logout',param)
}
export default engineeringApi