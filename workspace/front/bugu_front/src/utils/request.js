//拦截器和后端交互方法
import axios from 'axios'
import router from '../router'
import { getToken, removeToken, setLoginStatus,removeUserInfo} from './token'
import { message } from 'ant-design-vue';

// 使用 cancel token 取消请求
const CancelToken = axios.CancelToken
let source = CancelToken.source()
let fileName = ""
//可区分用户/管理员的url 在请求的url前加入user/admin
const baseURL = '/'
// const baseURL = process.env.NODE_ENV === 'development' ? '/bugu' : '/bugu'

// 创建实例
const service = axios.create({
  baseURL,
  timeout: 2500
})

// 拦截器：在请求或响应被 then 或 catch 处理前拦截它们。
// 请求拦截器
service.interceptors.request.use((config) => {
  // console.log(config)
  // 判断是否存在token，如果存在的话，则每个http header都加上token
  if (getToken()) {
    config.headers.Authorization = getToken()
  }
    return config;
  }, (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 响应拦截器
service.interceptors.response.use((response) => {
  
    // 对响应数据做点什么
    if(response.headers['content-disposition']!==undefined){
      // console.log(response)
      fileName = response.headers['content-disposition'].split('=')[1]
    }
    if(response.data.code === 499 || response.data.code === 480){
      setLoginStatus(false)
      removeToken()
      removeUserInfo()
      message.error(response.data.msg+",请重新登陆")
      router.push({
        path:'/entrance'
      })
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

function requestByDownload (url, params) {
  return service({
    method: 'get',
    url,
    headers: {
      token: getToken(),
      // Accept: 'application/zip',
    },
    params: { ...params },
    responseType: 'blob' 
  }).then((res) => {
    if(!res.size){
      message.error("下载失败！")
    }else{
      if ('msSaveOrOpenBlob' in navigator) {
        window.navigator.msSaveOrOpenBlob(res, fileName)
      } else {
        // 创建下载链接
        const downloadElement = document.createElement('a')
        // 浏览器默认文件保存路径
        const downloadUrl = window.URL.createObjectURL(res)
        downloadElement.href = downloadUrl
        fileName = fileName.replace(new RegExp('"', 'g'), '')
        let date = showtime()
        let downloadName = fileName + ' ' + date
        downloadElement.download = downloadName
        // 在浏览器中生成下载链接
        document.body.appendChild(downloadElement)
        downloadElement.click()
        message.success("下载成功", 0.7)
        // setTimeout(() => {
        //   // 释放blob对象
        //   window.URL.revokeObjectURL(downloadUrl)
        // }, 0)
      }
    }
  })
}
const checkTime = function (i) {
  if (i < 10) {
      i = "0" + i;
  }
  return i;
}
const showtime = function () {
  let nowdate = new Date();
  let year = nowdate.getFullYear(),
      month = nowdate.getMonth() + 1,
      day = nowdate.getDay() + 1,
      h = checkTime(nowdate.getHours()),
      m = checkTime(nowdate.getMinutes()),
      s = checkTime(nowdate.getSeconds())

  return year + "-" + month + "-" + day + " " + h +"-" + m + "-" + s;
}
const cancelRequest = () => {
  source.cancel('')
  source = CancelToken.source()
}
export { cancelRequest, requestByGet, requestByPost, baseURL, requestByPut, requestByDelete, requestByDownload }
