/*
 * @Description: 用jsonwebtoken生成token给客户端
 * @version: 1.0.0
 * @Author: WPO
 * @Date: 2022-04-09 00:45:09
 * @LastEditors: WPO
 * @LastEditTime: 2022-04-22 15:01:43
 */

const jwtSet = require('jsonwebtoken');// json -> jwt
const jwtVer = require('express-jwt')// jwt解密 jwt-> json 用于验证token
const signkey = 'BUGU_KEY';

// 生成token
const setToken = (uid) => {
 return new Promise((resolve, reject) => {
  const token = 'Bearer ' + jwtSet.sign({
   id: uid,
  }, signkey, {
    expiresIn: 60 * 60 * 3, // 过期时间
  });
  resolve(token);
 })
}

// express-jwt方法解析token 会将token中的信息保存在req.user中
const vertifyToken = () => {
  return jwtVer({
    secret: signkey, //密钥
    algorithms:['HS256'] // 加密方式
  }).unless({
    path: ['/entrance/login','/entrance/register'] // 不需要验证的路由
  })
}

// jwt方法解析token
const jwtVerToken = (token) => {
 return new Promise((resolve, reject) => {
   // 去掉Bearer
  jwtSet.verify(token.split(' ')[1], signkey,(err, decoded) => {
    if (err) {
      reject(err)
    } else {
      resolve(decoded)
    }
  });
 })
}

// 错误处理
const errorToken = (err,req,res,next) => {
  console.log('token',err)
  // token验证失败
  if(err.name === 'UnauthorizedError'){
    // token过期
    if(err.inner.name === 'TokenExpiredError'){
      res.json({ code:499,msg:"Token过期"})
    }
    // token无效
    else if(err.inner.name === 'JsonWebTokenError'){
      res.json({ code:480,msg:"无效的token"})
    }
  }
}

module.exports ={
	setToken,
	jwtVerToken,
  vertifyToken,
  errorToken
}