<!--
 * @Description: 
 * @version: 1.0.0
 * @Author: WPO
 * @Date: 2022-03-29 11:43:01
 * @LastEditors: WPO
 * @LastEditTime: 2022-04-11 23:05:07
-->
<!-- 用户个人界面 -->
<template>
  <transition mode="out-in"
              appear
              appear-active-class="animate__animated animate__fadeIn">
    <a-layout id="components-layout-demo-top-side">
      <Header></Header>
      <a-layout-content style="margin: 15px 60px">
        <a-layout style="padding: 10px 0; background: #fff">
          <a-layout-sider width="200"
                          style="background: #fff">
            <a-menu mode="inline"
                    style="height: 100%">
              <a-menu-item key="1">
                <router-link to="/usercenter/userinfo">
                  <a-icon type="user" />
                  <span>个人信息</span>
                </router-link>
              </a-menu-item>

              <a-menu-item key="2">
                <router-link to="/usercenter/projectinfo">
                  <a-icon type="laptop" />
                  <span>项目信息</span>
                </router-link>
              </a-menu-item>
              <!-- <a-menu-item key="3">
                <a-icon type="notification" />
                <span>xxx</span>
              </a-menu-item> -->
            </a-menu>
          </a-layout-sider>
          <transition mode="out-in"
                      leave-active-class="animate__animated animate__fadeRight"
                      enter-active-class="animate__animated animate__fadeLeft">
            <a-layout-content :style="{ padding: '0 20px', height: '80vh' }">
              <router-view></router-view>
            </a-layout-content>
          </transition>
        </a-layout>
      </a-layout-content>
      <a-layout-footer style="text-align: center; height:10vh; padding: 0px">
        BUGU ©{{new Date().getFullYear()}} Created by BUGU
      </a-layout-footer>
    </a-layout>
  </transition>
</template>

<script>

import Header from '../project/components/layout/Header'

export default {
  name: "UserCenter",
  //import引入的组件需要注入到对象中才能使用
  components: {
    Header
  },
  data() {
    //这里存放数据
    return {
      visible: false,
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {

  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {

  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {

  },
  beforeCreate() { }, //生命周期 - 创建之前
  beforeMount() { }, //生命周期 - 挂载之前
  beforeUpdate() { }, //生命周期 - 更新之前
  updated() { }, //生命周期 - 更新之后
  beforeDestroy() { }, //生命周期 - 销毁之前
  destroyed() { }, //生命周期 - 销毁完成
  activated() { }, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style>
</style>
