/*
 * @Description: 工程项目接口
 * @version: 1.0.0
 * @Author: WPO
 * @Date: 2022-04-10 01:37:31
 * @LastEditors: WPO
 * @LastEditTime: 2022-04-22 00:37:34
 */

import { requestByPost,requestByPut,requestByDelete,requestByGet } from '@/utils/request'

const engineeringApi = {
  init: (param) => requestByPost('/engineering/init',param),
  add: (param) => requestByPost('/engineering',param),
  queryById: (id) => requestByGet('/engineering/'+id),
  queryByUid: (uid) => requestByGet('/engineering/user/'+uid),
  queryAll: () => requestByGet('/engineering'),
	update: (param) => requestByPut('/engineering', param),
  del: (id) => requestByDelete('/engineering/'+id)
}
export default engineeringApi