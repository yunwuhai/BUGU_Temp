/*
 * @Description: 方法操作的接口
 * @version: 1.0.0
 * @Author: WPO
 * @Date: 2022-04-12 01:12:54
 * @LastEditors: WPO
 * @LastEditTime: 2022-05-11 19:51:32
 */

import { requestByPost,requestByPut,requestByDelete,requestByGet } from '@/utils/request'

const methodApi = {
  add: (param) => requestByPost('/method',param),
  queryById: (id) => requestByGet('/method/'+id),
  queryAll: () => requestByGet('/method'),
	update: (param) => requestByPut('/method', param),
  del: (param) => requestByDelete('/method', param),
	updateOverload: (param) => requestByPut('/method/overload', param),
	delOverload: (id) => requestByDelete('/method/overload/'+id),
  addDesMethod: (params) => requestByPost('/method/des',params),
  delDesMethod: (params) => requestByDelete('/method/des',params),
  delDesMethodAll: (params) => requestByDelete('/method/desall',params),
  getClassMethod: (params) => requestByGet('/method/class',params),
  getParentMethod: (cid) => requestByGet('/method/parent/'+cid),
}
export default methodApi