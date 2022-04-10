/*
 * @Descripttion: 数据库增删查改的api封装
 * @version: 1.0.0
 * @Author: WPO
 * @Date: 2022-04-08 15:49:44
 * @LastEditors: WPO
 * @LastEditTime: 2022-04-10 13:19:10
 */

// mysql连接池配置文件 使用连接池，避免开太多的线程，提升性能
const mysql = require("mysql");
const $dbConfig = require("./dbConfig"); //注意改成自己项目中mysql配置文件的路径
const sql = require("./sql.js"); //sql语句封装
const pool = mysql.createPool($dbConfig);  
const json = require("./json");

/**
 * @description           遍历数据的值
 * @param {obj} obj       包含参数的对象
 * @return {arr} paramArr 值构成的数组    
 * */
 let paramList = (obj) => {
  let paramArr = [];
  for (let key in obj) {
    if (obj[key]) {
      paramArr.push(obj[key]);
    }
  }
  return paramArr;
};

/**
 * @description:       新增一条数据
 * @param {str} table  数据库表的名称
 * @param {obj} req    插入的数据
 * @param {obj} res    接口函数中的res对象
 * @param {obj} next   接口函数中的next对象
 * @return {*} 
 */
let dbInsert = (table, req, res, next) => {
  pool.getConnection((err, connection) => {
    if(err){
      console.error(err)
      return
    }else{
      let paramValue = paramList(req);
      // result 查询结果
      connection.query(sql[table].insert, [...paramValue], (err, result) => {
        // console.log(result)
        // fieldCount: 0,
        // affectedRows: 1,
        // insertId: 7,
        // serverStatus: 2,
        // warningCount: 0,
        // message: '',
        // protocol41: true,
        // changedRows: 0  
        if (result) {
          result = "insert"
        }
        // 以json形式，把操作结果返回给前台页面
        json(res, result, err);
        // 释放连接
        connection.release();
      });
    }
  });
};

/**
 * @description:       删除一条数据
 * @param {str} table  数据库表的名称
 * @param {obj} req    需要删除的id
 * @param {obj} res    接口函数中的res对象
 * @param {obj} next   接口函数中的next对象
 * @return {*}
 */
let dbDelete = (table, req, res, next) => {
  let paramValue = paramList(req);
  pool.getConnection((err, connection) => {
    if(err){
      console.error(err)
      return
    }else{
      connection.query(sql[table].delete, [...paramValue], (err, result) => {
        if (result.affectedRows > 0) {
          result = "delete";
        } else {
          // 没有数据变动
          result = undefined;
        }
        json(res, result, err);
        connection.release();
      });
    }
  });
};

/**
 * @description:       更新一条数据
 * @param {str} table  数据库表的名称
 * @param {obj} req    需要更新的数据
 * @param {obj} res    接口函数中的res对象
 * @param {obj} next   接口函数中的next对象
 * @return {*}
 */
let dbUpdate = (table, req, res, next) => {
  let paramValue = paramList(req);
  pool.getConnection((err, connection) => {
    if(err){
      console.error(err)
      return
    }else{
      connection.query(sql[table].update, [...paramValue], (err, result) => {
        console.log(result)
        if (result.affectedRows > 0) {
          result = "update";
        } else {
          // 没有数据变动
          result = undefined;
        }
        json(res, result, err);
        connection.release();
      });
    }
  });
};

/**
 * @description:       根据id查询一条数据
 * @param {str} table  数据库表的名称
 * @param {obj} req    查询的id
 * @param {obj} res    接口函数中的res对象
 * @param {obj} next   接口函数中的next对象
 * @return {*}
 */
let dbQueryById = (table, req, res, next) => {
  let paramValue = paramList(req);
  pool.getConnection((err, connection) => {
    if(err){
      console.error(err)
      return
    }else{
      connection.query(sql[table].queryById, [...paramValue], (err, result) => {
        if (result != "") {
          var _result = result;
          result = {
            result: "select",
            data: _result,
          };
        } else {
          result = undefined;
        }
        json(res, result, err);
        connection.release();
      });
    }
  });
};

/**
 * @description:       查询所有数据
 * @param {str} table  数据库表的名称
 * @param {obj} req    
 * @param {obj} res    接口函数中的res对象
 * @param {obj} next   接口函数中的next对象
 * @return {*}
 */
let dbQueryAll = (table, req, res, next) => {
  pool.getConnection((err, connection) => {
    if(err){
      console.error(err)
      return
    }else{
      connection.query(sql[table].queryAll, (err, result) => {
        // 查询到了数据
        if (result != "") {
          var _result = result;
          result = {
            result: "selectall",
            data: _result,
          };
        } else {
          result = undefined;
        }
        json(res, result, err);
        connection.release();
      });
    }
  });
};

/**
 * @description:       登录
 * @param {str} table  数据库表的名称
 * @param {obj} req    查询的id
 * @param {obj} res    接口函数中的res对象
 * @param {obj} next   接口函数中的next对象
 * @return {*}
 */
 let login = (table, req, callback) => {
  let paramValue = paramList(req);
  pool.getConnection((err, connection) => {
    if(err){
      console.error(err)
      return
    }else{
      connection.query(sql[table].vertify, [...paramValue], (err, result) => {
        callback(err,result);
        connection.release();
      });
    }
  });
};

module.exports = {
  dbInsert,
  dbDelete,
  dbUpdate,
  dbQueryById,
  dbQueryAll,
  login
};
