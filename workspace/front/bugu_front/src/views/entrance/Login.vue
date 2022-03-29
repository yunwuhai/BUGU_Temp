<!-- 登录表单 -->
<template>
  <div class="login">
    <a-form-model ref="ruleForm"
                  :model="loginForm"
                  v-bind="layout">
      <a-form-model-item has-feedback
                         label="用户名"
                         prop="userName">
        <a-input v-model="loginForm.userName"
                 type="text"
                 allowClear
                 autocomplete="off" />
      </a-form-model-item>
      <a-form-model-item has-feedback
                         label="密码："
                         prop="pass">
        <a-input v-model="loginForm.pass"
                 type="password"
                 allowClear
                 autocomplete="off" />
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary"
                  @click="submitForm('ruleForm')">
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
export default {
  data() {
    return {
      loginForm: {
        userName: "",
        pass: ''
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 15 },
      },
    };
  },
  methods: {
    submitForm(formName) {
      // this.$refs[formName].validate(valid => {
      //   if (valid) {
      if (this.loginForm.userName === 'wpo' && this.loginForm.pass === '123456') {
        this.$message.success('登陆成功', 0.5)
        this.$router.push({ name: 'Project' })
      } else {
        this.$message.error('账号或密码错误', 0.5)
        return false
      }
      // } else {
      //   this.$message.error('登陆失败', 0.5)
      //   return false;
    },    // });
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped>
.login {
  margin-left: 12%;
  margin-top: 24%;
  /* height: 100px; */
}
</style>