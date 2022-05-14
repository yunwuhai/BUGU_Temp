/*
 * @Description: 组件项目接口
 * @version: 1.0.0
 * @Author: WPO
 * @Date: 2022-04-10 01:40:31
 * @LastEditors: WPO
 * @LastEditTime: 2022-04-12 00:51:37
 */

import { requestByPost,requestByPut,requestByDelete,requestByGet } from '@/utils/request'

const componentApi = {
  add: (param) => requestByPost('/component',param),
  queryById: (id) => requestByGet('/component/'+id),
  queryAll: () => requestByGet('/component'),
	update: (param) => requestByPut('/component', param),
  del: (id) => requestByDelete('/component/'+id)
}
export default componentApi