/*
 * @Description: 客户端例如：单页面应用开发、移动应用等， 就可以跨域访问服务端对应的接口
 * @version: 1.0.0
 * @Author: WPO
 * @Date: 2022-04-08 15:51:11
 * @LastEditors: WPO
 * @LastEditTime: 2022-04-09 15:45:39
 */

function corsRequest(app){
	app.all("*",(req,res,next)=>{
	    //设置允许跨域的域名，*代表允许任意域名跨域
	    res.header("Access-Control-Allow-Origin","*");
	    //跨域允许的请求方式 
			res.header("Access-Control-Allow-Headers", "Content-type");
	    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
			res.header("X-Powered-By","3.2.1");
			res.header("Content-Type","application/json;charset=utf-8");
			res.header("Access-Control-Allow-Credentials",true);
			res.header("Cache-Control","no-store");
	    if (req.method.toLowerCase() == 'options'){
				res.send(200);  //让options尝试请求快速结束
			}else{
				next();
			}
	})
}

module.exports = corsRequest;
