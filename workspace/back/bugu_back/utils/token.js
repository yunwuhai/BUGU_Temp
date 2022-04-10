/*
 * @Description: 用jsonwebtoken生成token给客户端
 * @version: 1.0.0
 * @Author: WPO
 * @Date: 2022-04-09 00:45:09
 * @LastEditors: WPO
 * @LastEditTime: 2022-04-10 02:40:59
 */

const jwt = require('jsonwebtoken');
const signkey = 'BUGU_TOKEN';

// 生成token
let setToken = (uid) => {
 return new Promise((resolve, reject) => {
  const token = jwt.sign({
   id: uid,
	 expiresIn: 60,
  }, signkey);
  resolve(token);
 })
}

// 解析token
let verToken = (token) => {
 return new Promise((resolve, reject) => {
  jwt.verify(token.split(' ')[1], signkey,(err, decoded) => {
    if (err) {
      reject(err)
    } else {
      resolve(decoded)
    }
  });
 })
}

module.exports ={
	setToken,
	verToken
}