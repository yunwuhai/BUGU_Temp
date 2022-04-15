/*
 * @Description: 数据库的基本信息配置
 * @version: 1.0.0
 * @Author: WPO
 * @Date: 2022-04-08 15:49:31
 * @LastEditors: WPO
 * @LastEditTime: 2022-04-10 14:05:04
 */

var dbConfig = {
  host: "localhost",
  user: "root",
  password: "310017",
  port: "3306",
  database: "bugu_back",
	connectionLimit:300,
	charset:'utf8mb4',
	dialect:'mysql'
};

module.exports = dbConfig