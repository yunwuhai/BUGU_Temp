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
export default {
  data() {
    return {
      loading: false,
      loginForm: {
        userName: "",
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
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true
          //  在vuex中进行后端验证 返回promise
          // this.$store.dispatch('login', { userName: this.loginForm.userName, pass: this.loginForm.pass })
          if (this.loginForm.userName === 'admin' && this.loginForm.pass === '123456') {
            this.loginForm.role = 2
            Cookie.setUserInfo(this.loginForm)
            Cookie.setToken("BUGU_ADMIN")
            this.$router.push({ name: 'Admin' })
            this.$message.success('登陆成功', 0.5)
            // console.log("token：" + Cookie.getToken())
            // console.log("user：" + Cookie.getUserInfo().role)
            this.loading = false
          }
          else if (this.loginForm.userName === 'wpo' && this.loginForm.pass === '123456') {
            Cookie.setToken("BUGU_USER")
            Cookie.setUserInfo(this.loginForm)
            this.$router.push({ name: 'UserCenter' })
            this.$message.success('登陆成功', 0.5)
            // console.log("token：" + Cookie.getToken())
            // console.log("user：" + Cookie.getUserInfo().role)
            this.loading = false

          } else {
            this.$message.error('账号或密码错误', 0.5)
            // this.$nextTick(() => {
            //   this.$refs['ruleForm'].resetFields();
            // })
            this.loading = false
          }
        } else {
          this.$message.error('登陆失败', 0.5)
          return false
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