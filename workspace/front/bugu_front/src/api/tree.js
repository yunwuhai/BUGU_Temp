/*
 * @Description: 获得树形菜单
 * @version: 1.0.0
 * @Author: WPO
 * @Date: 2022-03-30 10:37:02
 * @LastEditors: WPO
 * @LastEditTime: 2022-04-11 17:21:02
 */
// 树形控件接口
import { requestByGet } from '@/utils/request'
const treeApi = {
  getTree: (uid,eid) => requestByGet('/tree/'+ uid +'/'+ eid),
}
export default treeApi
