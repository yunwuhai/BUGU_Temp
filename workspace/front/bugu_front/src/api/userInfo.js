/*
 * @Description: 用户信息接口
 * @version: 1.0.0
 * @Author: WPO
 * @Date: 2022-04-27 01:51:30
 * @LastEditors: WPO
 * @LastEditTime: 2022-05-06 01:51:39
 */


import { requestByPost,requestByPut,requestByDelete,requestByGet } from '@/utils/request'

const userInfoApi = {
  add: (param) => requestByPost('/userInfo',param),
  queryById: (id) => requestByGet('/userInfo/'+id),
  queryAll: () => requestByGet('/userInfo'),
	update: (param) => requestByPut('/userInfo', param),
  del: (id) => requestByDelete('/userInfo/'+id)
}
export default userInfoApi