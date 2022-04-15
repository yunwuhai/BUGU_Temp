/*
 * @Description: 类接口
 * @version: 1.0.0
 * @Author: WPO
 * @Date: 2022-04-12 00:50:12
 * @LastEditors: WPO
 * @LastEditTime: 2022-04-14 16:28:34
 */

import { requestByPost,requestByPut,requestByDelete,requestByGet } from '@/utils/request'

const classApi = {
  add: (param) => requestByPost('/class',param),
  queryById: (id) => requestByGet('/class/'+id),
  queryAll: () => requestByGet('/class'),
	update: (param) => requestByPut('/class', param),
  del: (id) => requestByDelete('/class/'+id),
  getParentList: (id) => requestByGet('/class/parent/'+id),
}
export default classApi