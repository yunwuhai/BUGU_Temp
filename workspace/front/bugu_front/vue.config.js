const path = require('path')
function resolve(dir) {
	return path.join(__dirname, '.', dir)
}

module.exports = {
  // 基本路径
  // publicPath: "/",
  // 输出文件目录
  outputDir: "dist",
  // webpack-dev-server 相关配置
  // devServer: {
  //   port: 8888,
  // },
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


