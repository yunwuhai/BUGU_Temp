/*
 * @Description: 
 * @version: 1.0.0
 * @Author: WPO
 * @Date: 2022-03-21 10:27:22
 * @LastEditors: WPO
 * @LastEditTime: 2022-05-05 21:35:04
 */
//本地cookie操作
import Cookie from 'vue-cookies'
const TokenKey = 'BUGU_TOKEN'
const isLogin = 'LOGIN_STATUS'
const userInfo = 'USER'
const projectInfo = 'PROJECT_INFO'

//默认cookie过期时间为1d
// export const setCookieConfig = (expireTime) =>{
//   return Cookie.config(expireTime)
// }

export const getToken = () => {
  return Cookie.get(TokenKey)
}
//token为后端返回
export const setToken = (token) => {
  return Cookie.set(TokenKey, token)
}
export const removeToken = () => {
  return Cookie.remove(TokenKey)
}

export const setLoginStatus = (loginStatus) => {
  return Cookie.set(isLogin, loginStatus)
}
export const getLoginStatus = () => {
  return Cookie.get(isLogin)
}

export const setUserInfo = (user) => {
  return Cookie.set(userInfo, user)
}
export const getUserInfo = () => {
  return Cookie.get(userInfo)
}
export const removeUserInfo = () => {
  return Cookie.remove(userInfo)
}

export const setProjectInfo = (project) => {
  return Cookie.set(projectInfo, project)
}
export const getProjectInfo = () => {
  return Cookie.get(projectInfo)
}
export const removeProjectInfo = () => {
  return Cookie.remove(projectInfo)
}

// export default{
//   getToken : () => {
//     return Cookie.get(TokenKey)
//   },
//   //token为后端返回
//   setToken : (token) => {
//     return Cookie.set(TokenKey, token)
//   },
//   removeToken : () => {
//     return Cookie.remove(TokenKey)
//   },
//   setLoginStatus : (loginStatus) => {
//     return Cookie.set(isLogin, loginStatus)
//   },
//   getLoginStatus : () => {
//     return Cookie.get(isLogin)
//   },
//   setUserInfo : (user) => {
//     return Cookie.set(userInfo, user)
//   },
//   getUserInfo : () => {
//     return Cookie.get(userInfo)
//   }
// }