// index.js代码
import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon' // svg组件
Vue.component('svg-icon', SvgIcon)
const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('./svg', true, /\.svg$/)
//这行代码就会去 svg 文件夹（不包含子目录）下找所有文件名以 .svg 结尾的文件能被 require 的文件。
// 我们通过正则匹配引入相应的文件模块。
// require.context有三个参数：
// directory：说明需要检索的目录
// useSubdirectories：是否检索子目录
// regExp: 匹配文件的正则表达式
requireAll(req)
