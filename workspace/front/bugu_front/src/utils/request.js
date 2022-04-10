//拦截器和后端交互方法
import axios from 'axios'
import router from '../router'
import { getToken, removeToken, setLoginStatus,removeUserInfo} from './token'
import { message } from 'ant-design-vue';

// 使用 cancel token 取消请求
const CancelToken = axios.CancelToken
let source = CancelToken.source()
let filename = ''

//可区分用户/管理员的url 在请求的url前加入user/admin
const baseURL = '/'
// const baseURL = process.env.NODE_ENV === 'development' ? '/bugu' : '/bugu'

// 创建实例
const service = axios.create({
  baseURL,
  timeout: 25000
})

// 拦截器：在请求或响应被 then 或 catch 处理前拦截它们。
// 请求拦截器
service.interceptors.request.use((config) => {
  // 判断是否存在token，如果存在的话，则每个http header都加上token
  if (getToken()) {
    config.headers.Authorization = 'Bearer'+ getToken()
  }
    return config;
  }, (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 响应拦截器
service.interceptors.response.use((response) => {
    // 对响应数据做点什么
    // console.log(response)
    if(response.data.code === 499 || response.data.code === 480){
      message.error(response.data.msg+",请重新登陆")
      router.push({
        path:'/entrance'
      })
      setLoginStatus(false)
      removeToken()
      removeUserInfo()
    }
    return response.data;
  }, (error) => {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

// 默认数据类型 application/json
//获得数据
function requestByGet (url, params) {
  return service({
    method: 'get',
    headers: {
      token: getToken()
    },
    url,
    params: { ...params }
  })
}

//提交数据
function requestByPost (url, body) {
  return service({
    method: 'post',
    headers: {
      token: getToken()
    },
    url,
    data: body
  })
}

//更新数据
function requestByPut (url, body) {
  return service({
    method: 'put',
    url,
    headers: {
      token: getToken()
    },
    data: body
  })
}

//删除数据
function requestByDelete (url, body) {
  return service({
    method: 'delete',
    url,
    headers: {
      token: getToken()
    },
    data: body
  })
}

function requestBydownload (url, params) {
  return service({
    method: 'get',
    url,
    headers: {
      token: getToken()
    },
    params: { ...params },
    responseType: 'arraybuffer'
  }).then((res) => {
    debugger
    console.log(filename)
    const blob = new Blob([res], {
      type: 'application/vnd.ms-excel;charset=utf-8'
    })
    if ('msSaveOrOpenBlob' in navigator) {
      window.navigator.msSaveOrOpenBlob(blob, filename)
    } else {
      const downloadElement = document.createElement('a')
      const downloadUrl = window.URL.createObjectURL(blob)
      filename = decodeURIComponent(filename)
      downloadElement.href = downloadUrl
      downloadElement.download = filename
      document.body.appendChild(downloadElement)
      downloadElement.click()
      setTimeout(() => {
        window.URL.revokeObjectURL(url)
      }, 0)
    }
  })
}
const cancelRequest = () => {
  source.cancel('')
  source = CancelToken.source()
}
export { cancelRequest, requestByGet, requestByPost, baseURL, requestByPut, requestByDelete, requestBydownload }
