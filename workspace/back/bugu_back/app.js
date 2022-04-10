/*
 * @Description: 项目入口文件
 * @version: 1.0.0
 * @Author: WPO
 * @Date: 2022-04-08 09:42:46
 * @LastEditors: WPO
 * @LastEditTime: 2022-04-09 15:14:04
 */

let createError = require('http-errors');
const express = require('express');
const app = express();// express实例
let path = require('path');
let cookieParser = require('cookie-parser');
const router = require('./routes/index');// 路由
const bodyParser = require('body-parser')
const history = require('connect-history-api-fallback');//前端路由的history模式
let fs = require('fs')//文件操作
let logger = require('morgan');// 记录http日志
let winston = require('./utils/errorLog');//记录其他错误日志
const jwt = require('express-jwt')// jwt解密
const token = require('./utils/token')// 验证token

// 使用核心模块querystring进行处理操作 全局解析
app.use(bodyParser.json());
// 默认的路由配置直接写在根目录app.js里面
app.use(router);

// 路由history模式
app.use(history())
app.use(express.static(path.join(__dirname, 'public')));

// jwt解密
app.use(jwt({
  secret: 'BUGU_TOKEN', //密钥
  algorithms:['HS256'] // 加密方式
}).unless({
  path: ['/entrance/login','/entrance/register'] // 不需要验证的路由
}))

// 验证token是否过期,是否有效, 将token解析成用户信息放到req.data里, 每次请求接口都可以获取到
app.use((req, res, next) => {
  let token = req.headers['authorization'];
  if (token == undefined){
    // res.status(403).send({ code: -1, msg: '无效的token' })
    res.json({ code:480,msg:"无效的token" })
    return next()
  }
  
  token.verToken(token).then((decoded) => {
    req.data = decoded
    return next()
  })
  .catch((err) => {
    if (err.name === 'JsonWebTokenError') {
      // res.status(403).send({ code: -1, msg: 'Token无效' })
      res.json({ code:480,msg:"无效的token"})
    } else if (err.name === 'TokenExpiredError') {
      // res.status(403).send({ code: -1, msg: 'Token过期' })
      res.json({ code:499,msg:"Token过期"})
    }
    return next()
  }
  )
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  winston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} -${req.method} - ${req.ip}`); 
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// 输出日志到目录
let accessLogStream = fs.createWriteStream(path.join(__dirname,'./log/request.log'), {flags:'a',encoding: 'utf8' }); 
app.use(logger('combined', { stream: accessLogStream }))
// 输出日志到控制台
app.use(logger('dev'));

// module.exports 对象是由模块系统创建的。在我们自己写模块的时候，需要在模块最后写好模块接口，声明这个模块对外暴露什么内容，module.exports 提供了暴露接口的方法。
module.exports = app;
