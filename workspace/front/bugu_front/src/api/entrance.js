/*
 * @Description: 登录注册接口
 * @version: 1.0.0
 * @Author: WPO
 * @Date: 2022-03-30 10:36:40
 * @LastEditors: WPO
 * @LastEditTime: 2022-04-10 01:37:55
 */

import { requestByPost } from '@/utils/request'

const entranceApi = {
  login: (param) => requestByPost('/entrance/login',param),
	register: (param) => requestByPost('/entrance/register', param),
  logout: () => requestByPost('/entrance/logout')
}
export default entranceApi
