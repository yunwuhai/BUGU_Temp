/*
 * @Description: 下载文件接口
 * @version: 1.0.0
 * @Author: WPO
 * @Date: 2022-04-28 11:16:48
 * @LastEditors: WPO
 * @LastEditTime: 2022-04-30 17:20:03
 */

import { requestByPost,requestByPut,requestByDelete,requestByGet } from '@/utils/request'
import { requestByDownload } from '../utils/request'

const downloadApi = {
	downloadEXE:(id) => requestByDownload('/download/exe/'+id),
	downloadSource:(id) => requestByDownload('/download/source/'+id),
	
  add: (param) => requestByPost('/download',param),
  queryById: (id) => requestByGet('/download/'+id),
  queryAll: () => requestByGet('/download'),
	update: (param) => requestByPut('/download', param),
  del: (id) => requestByDelete('/download/'+id)
}
export default downloadApi