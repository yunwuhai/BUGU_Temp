<!-- 登录表单 -->
<template>
  <div class="login">
    <a-form-model ref="ruleForm"
                  :rules="rules"
                  :model="loginForm"
                  v-bind="layout">
      <a-form-model-item label="用户名"
                         prop="userName">
        <a-input v-model="loginForm.userName"
                 type="text"
                 :autoFocus="true"
                 allowClear
                 autocomplete="off"
                 @keyup.enter="nextFocus()" />
      </a-form-model-item>
      <a-form-model-item label="密码："
                         prop="pass">
        <a-input v-model="loginForm.pass"
                 ref="pass"
                 type="password"
                 allowClear
                 autocomplete="off"
                 @keyup.enter="submitForm('ruleForm')" />
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{span:14,offset:4}">
        <a-button type="primary"
                  @click="submitForm('ruleForm')"
                  :loading="loading">
          登录
        </a-button>
        <!-- <a-button style="margin-left: 10px"
                  @click="resetForm('ruleForm')">
          Reset
        </a-button> -->
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import * as Cookie from '@/utils/token.js'
import entranceApi from '@/api/entrance'

export default {
  data() {
    return {
      loading: false,
      loginForm: {
        userName: "",
        nickName: "",
        pass: '',
        role: 1
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 15 },
      },
      rules: {
        userName: [{ required: true, message: '请输入用户名', trigger: 'change' }],
        pass: [{ required: true, message: '请输入密码', trigger: 'change' }],
      }
    }
  },
  methods: {
    regSuccess(registerForm) {
      this.loginForm.userName = registerForm.userName
      this.loginForm.pass = registerForm.pass
    },
    nextFocus() {
      this.$refs.pass.focus()
    },
    submitForm(formName) {
      this.loading = true
      this.$refs[formName].validate(valid => {
        if (valid) {
          entranceApi.login({
            userName: this.loginForm.userName,
            pass: this.loginForm.pass
          })
            .then((res) => {
              // console.log(res.data.userInfo)
              if (res.code === 200) {
                this.$message.success(res.msg, 0.5)
                Cookie.setLoginStatus(true)
                Cookie.setToken(res.data.token)
                delete res.data.userInfo[0].pass
                Cookie.setUserInfo(res.data.userInfo[0])
                // console.log(Cookie.getUserInfo())
                this.loading = false
                this.$router.push({
                  path: '/usercenter'
                })
              } else {
                this.$message.error(res.msg, 0.7)
                Cookie.setLoginStatus(false)
                this.loading = false
              }
            })
            .catch((err) => {
              this.$message.error("登录失败", 0.5)
              console.log(err)
              this.loading = false
            })
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  mounted() {
    this.$bus.$on('success', this.regSuccess)
  }
};
</script>

<style scoped>
.login {
  margin-left: 12%;
  margin-top: 24%;
  /* height: 100px; */
}
</style>