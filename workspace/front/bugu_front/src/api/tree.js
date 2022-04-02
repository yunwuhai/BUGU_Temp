// 树形控件接口
import { requestByGet,requestByPut,requestByPost } from '@/utils/request'
const treeApi = {
  getTree: (param) => requestByGet('/login', param),
	updateTree: (param) => requestByPut('/register', param),
  saveTree: (param) => requestByPost('/logout',param)
}
export default treeApi
