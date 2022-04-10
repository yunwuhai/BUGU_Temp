/*
 * @Description: 
 * @version: 1.0.0
 * @Author: WPO
 * @Date: 2022-04-10 01:40:31
 * @LastEditors: WPO
 * @LastEditTime: 2022-04-10 01:40:31
 */

import { requestByPost,requestByPut,requestByDelete } from '@/utils/request'

const componentsApi = {
  add: (param) => requestByPost('/project/components',param),
	update: (param) => requestByPut('/project/components', param),
  delete: (param) => requestByDelete('/project/components',param)
}
export default componentsApi