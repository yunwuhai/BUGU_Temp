<!-- 注册表单 -->
<template>
  <div class="register">
    <a-form-model ref="ruleForm"
                  :model="registerForm"
                  :rules="rules"
                  v-bind="layout">
      <a-form-model-item has-feedback
                         label="昵称"
                         prop="nickName">
        <a-input v-model="registerForm.nickName"
                 type="text"
                 :autoFocus="true"
                 reg="userName"
                 allowClear
                 autocomplete="off"
                 @keyup.enter="nextFocus('userName')" />
      </a-form-model-item>
      <a-form-model-item has-feedback
                         label="用户名"
                         prop="userName">
        <a-input v-model="registerForm.userName"
                 type="text"
                 reg="userName"
                 placeholder="用于登录的账号"
                 allowClear
                 autocomplete="off"
                 @keyup.enter="nextFocus('pass')" />
      </a-form-model-item>
      <a-form-model-item has-feedback
                         label="密码："
                         prop="pass">
        <a-input v-model="registerForm.pass"
                 allowClear
                 ref="pass"
                 type="password"
                 autocomplete="off"
                 @keyup.enter="nextFocus('checkPass')" />
      </a-form-model-item>
      <a-form-model-item has-feedback
                         label="重复密码："
                         prop="checkPass">
        <a-input v-model="registerForm.checkPass"
                 allowClear
                 ref="checkPass"
                 type="password"
                 autocomplete="off"
                 @keyup.enter="nextFocus('tel')" />
      </a-form-model-item>
      <a-form-model-item has-feedback
                         label="手机号码："
                         prop="tel">
        <a-input v-model="registerForm.tel"
                 allowClear
                 type="text"
                 autocomplete="off"
                 @keyup.enter="submitForm('ruleForm')" />
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary"
                  @click="submitForm('ruleForm')"
                  :loading="loading">
          注册
        </a-button>
        <a-button style="margin-left: 10px"
                  @click="resetForm('ruleForm')">
          重置
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import entranceApi from '@/api/entrance'

export default {
  data() {
    let validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'));
      } else {
        // if (this.registerForm.userName !== '') {
        //   this.$refs.registerForm.validateField('userName');
        // }
        callback();
      }
    }
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        // if (this.registerForm.checkPass !== '') {
        //   this.$refs.registerForm.validateField('checkPass');
        // }
        callback();
      }
    }
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.registerForm.pass) {
        callback(new Error("两次密码不一致"));
      } else {
        callback();
      }
    }
    let validateTel = (rule, value, callback) => {
      // const reg = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;
      const reg = /^((1[3,5,8][0-9])|(14[5,7])|(17[0,5,6,7,8])|(19[7]))\d{8}$/
      if (value === '') {
        callback(new Error('请输入电话号码'));
      }
      else if (value.length < 11 || !reg.test(value)) {
        callback(new Error('电话号码错误'));
      }
      else {
        callback();
      }
    }
    return {
      loading: false,
      registerForm: {
        userName: '',
        nickName: '',
        pass: '',
        checkPass: '',
        tel: '',
      },
      rules: {
        nickName: [{ required: true, message: "请输入昵称", trigger: 'change' }],
        userName: [{ required: true, validator: validateUsername, trigger: 'change' }],
        pass: [{ required: true, validator: validatePass, trigger: 'change' }],
        checkPass: [{ required: true, validator: validatePass2, trigger: 'change' }],
        tel: [{ required: true, validator: validateTel, trigger: 'change' }],
      },
      layout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 15 },
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.loading = true
      this.$refs[formName].validate(valid => {
        if (valid) {
          let register = {
            userName: this.registerForm.userName,
            nickName: this.registerForm.nickName,
            pass: this.registerForm.pass,
            tel: this.registerForm.tel,
            role: "1",
            // createTime: new Date().
          }
          entranceApi.register(register)
            .then((res) => {
              if (res.code === 200) {
                console.log(res)
                this.$message.success('注册成功', 0.5)
                this.loading = false
                this.$bus.$emit('success', { userName: this.registerForm.userName, pass: this.registerForm.pass, activeKey: "1" })
                this.$refs[formName].resetFields();
              } else {
                this.$message.error('注册失败1', 0.5)
              }
            })
            .catch((err) => {
              this.$message.error('注册失败2', 0.5)
              console.err(err)
              this.loading = false
            })
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    nextFocus(name) {
      this.$refs[name].focus()
    },
  },
};
</script>

<style scoped>
.register {
  margin-left: 8%;
  margin-top: 4%;
}
</style>