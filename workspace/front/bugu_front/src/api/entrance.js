// 登录接口
import { requestByPost } from '@/utils/request'

const entranceApi = {
  login: (param) => requestByPost('/login', param),
	register: (param) => requestByPost('/register', param),
  logout: () => requestByPost('/logout')
}
export default entranceApi
