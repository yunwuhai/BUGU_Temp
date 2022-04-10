/*
 * @Description: 对操作数据库不同表的sql语句的封装
 * @version: 1.0.0
 * @Author: WPO
 * @Date: 2022-04-08 17:39:26
 * @LastEditors: WPO
 * @LastEditTime: 2022-04-10 13:30:06
 */

let userInfo = {
	// ?为占位符
  insert: "INSERT INTO userInfo(userName,nickName,pass,tel,role) VALUES(?,?,?,?,?)",
  update: "UPDATE userInfo SET userName=?,nickName=?,pass=?,tel=?,engineeringsId=?,componentsId=? WHERE id=?",
  delete: "DELETE FROM userInfo WHERE id=?",
  queryById: "SELECT * FROM userInfo WHERE id=?",
  queryAll: "SELECT * FROM userInfo",
};

let entrance = {
  vertify: "SELECT * FROM userInfo WHERE username = ? && pass = ?",
}

let components ={
  insert: "INSERT INTO components(name,token,userId,author,type,desription) VALUES(?,?,?,?,?,?)",
  update: "UPDATE components SET name=?,token=?,description=? WHERE id=?",
  delete: "DELETE FROM components WHERE id=?",
  queryById: "SELECT * FROM components WHERE id=?",
  queryAll: "SELECT * FROM components",
}

let engineerings ={
  insert: "INSERT INTO engineerings(userId,author,chipId,name,token,type,stack,ponentsId,desription) VALUES(?,?,?,?,?,?,?,?,?)",
  update: "UPDATE engineerings SET name=?,token=?,stack=?,description=?,chipId=? WHERE id=?",
  delete: "DELETE FROM engineerings WHERE id=?",
  queryById: "SELECT * FROM engineerings WHERE id=?",
  queryAll: "SELECT * FROM engineerings",
}
module.exports = {
  userInfo,
  entrance,
  components,
  engineerings
};