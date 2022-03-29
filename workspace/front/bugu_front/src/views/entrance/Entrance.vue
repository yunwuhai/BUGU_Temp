<template>
  <div class="container">
    <header class="header">
      <div class="img-container">
        <img src="@/assets/LOGO.png"
             alt="logo"
             width="210px"
             height="85px" />
      </div>
      <span class="header-title">不咕极简物联云开发平台</span>
    </header>
    <div class="content">
      <svg-icon icon-class="login"
                className="svg"></svg-icon>
      <a-divider type="vertical"
                 style="height:470px" />
      <div class="login-container">
        <a-tabs v-model="activeKey"
                style="text-align:center;">
          <a-tab-pane key="1"
                      tab="登录">
            <Login></Login>
          </a-tab-pane>
          <a-tab-pane key="2"
                      tab="注册">
            <Register></Register>
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import Login from './components/Login'
import Register from './components/Register'

export default {
  name: 'Entrance',
  components: {
    Login,
    Register
  },
  data() {
    return {
      activeKey: "1"
    }
  },
  methods: {
    //   submitForm(formName) {
    //     this.$refs[formName].validate(valid => {
    //       if (valid) {
    //         loginApi
    //           .login({
    //             username: this.loginForm.userName,
    //             password: this.loginForm.password
    //           })
    //           .then(res => {
    //             // console.log(res)
    //             if (res.code === 500) {
    //               Message.error('账户密码错误')
    //               setLoginStatus(false)
    //             } else {
    //               setLoginStatus(true)
    //               setToken(res.token)
    //               setUserInfo(res.user)
    //               // console.log(getToken())
    //               this.$message({
    //                 type: 'success',
    //                 message: '登录成功!'
    //               })
    //               this.$router.push({
    //                 path: '/'
    //               })
    //             }
    //           })
    //       } else {
    //         return false
    //       }
    //     })
    //   }
    regSuccess(registerForm) {
      this.activeKey = registerForm.activeKey
    }
  },
  mounted() {
    this.$bus.$on('success', this.regSuccess)
  }
}
</script>
<style lang="scss" scope>
.container {
  height: 100vh;
  margin: 0 auto;
  width: 100%;
  overflow: hidden;
  .header {
    display: flex;
    height: 78px;
    line-height: 78px;
    padding: 0 20px;
    background: rgba(215, 215, 215, 0.6);
    .img-container {
      &::after {
        content: '';
        background: #797575;
        position: absolute;
        height: 53px;
        width: 2px;
        top: 11px;
      }
    }
    .header-title {
      margin-left: 30px;
      font-weight: 400;
      font-size: 20px;
    }
  }
  .content {
    display: flex;
    padding: 60px 20px;
    height: 650px;
    background: url('~@/assets/loginBg.jpg');
    background-size: contain;
    .svg {
      width: 700px;
      height: 590px;
      // margin: ;
    }
    .login-container {
      margin-top: 90px;
      margin-left: 190px;
      width: 420px;
      // height: 400px;
      max-width: 100%;
      // text-align: center;
      // background-color: rgba(255, 255, 255, 0.4);
      box-shadow: 0 0 7px #909399;
      border-radius: 1px;
      -webkit-border-radius: 5px;
      -moz-border-radius: 5px;
    }
  }
}
.ant-tabs-nav .ant-tabs-tab {
  margin: 10px 50px 0 0;
}
// css穿透
// /deep/.el-input {
//   display: inline-block;
//   height: 47px;
//   input {
//     height: 47px;
//     line-height: 47px;
//   }
// }
</style>
