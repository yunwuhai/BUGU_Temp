/*
 * @Description: 数据操作的接口
 * @version: 1.0.0
 * @Author: WPO
 * @Date: 2022-04-13 02:33:53
 * @LastEditors: WPO
 * @LastEditTime: 2022-04-14 17:27:18
 */
import { requestByPost,requestByPut,requestByDelete,requestByGet } from '@/utils/request'

const dataApi = {
  add: (param) => requestByPost('/data',param),
  queryById: (id) => requestByGet('/data/'+id),
  queryAll: () => requestByGet('/data'),
	update: (param) => requestByPut('/data', param),
  del: (id) => requestByDelete('/data/'+id),
	queryByEngin: (uid,eid) => requestByGet('/data/engin/'+ uid +'/'+ eid),
	queryByClass: (uid,cid) => requestByGet('/data/class/'+ uid +'/'+ cid),
  getInOrOut: (id,type) => requestByGet('/data/type/'+ id + '/' + type)
}
export default dataApi