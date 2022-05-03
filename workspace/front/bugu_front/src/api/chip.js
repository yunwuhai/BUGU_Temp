/*
 * @Description: 芯片信息接口
 * @version: 1.0.0
 * @Author: WPO
 * @Date: 2022-04-27 01:51:30
 * @LastEditors: WPO
 * @LastEditTime: 2022-04-27 01:51:37
 */


import { requestByPost,requestByPut,requestByDelete,requestByGet } from '@/utils/request'

const chipApi = {
  add: (param) => requestByPost('/chip',param),
  queryById: (id) => requestByGet('/chip/'+id),
  queryAll: () => requestByGet('/chip'),
	update: (param) => requestByPut('/chip', param),
  del: (id) => requestByDelete('/chip/'+id)
}
export default chipApi