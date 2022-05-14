/*
 * @Description: 
 * @version: 1.0.0
 * @Author: WPO
 * @Date: 2022-01-29 22:43:55
 * @LastEditors: WPO
 * @LastEditTime: 2022-05-14 22:12:03
 */
const path = require('path')
function resolve(dir) {
	return path.join(__dirname, '.', dir)
}

module.exports = {
  // 基本路径
  publicPath: "/",
	// publicPath: process.env.NODE_ENV === 'development' ? '/' : '/',
  outputDir: 'dist',  // 输出文件目录
  assetsDir: 'static',
  indexPath: 'index.html',

  // webpack-dev-server 相关配置
  devServer: {
		proxy:"http://120.79.90.129:8081",
		//关闭用于 DNS 重绑定的 HTTP 请求的 HOST 检查。 DevServer 默认只接受来自本地的请求，关闭后可以接受来自任何 HOST 的请求。 
		disableHostCheck: true 
  },
  // 取消生产环境的souceMap，加速生产构建
  productionSourceMap: false,
  lintOnSave: false, //配置关闭eslint
  chainWebpack: config => {
		//配置svg-sprite-loader
		config.module
			.rule('svg')
			.exclude.add(resolve('src/icons'))
			.end();
		config.module
			.rule('svg-sprite-loader')
			.test(/\.svg$/)
			.include
			.add(resolve('./src/icons')) //处理svg目录
			.end()
			.use('svg-sprite-loader')
			.loader('svg-sprite-loader')
			.options({
				symbolId: 'icon-[name]'
			})
    },
};


