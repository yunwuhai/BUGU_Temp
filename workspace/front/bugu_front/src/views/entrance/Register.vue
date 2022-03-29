<!-- 注册表单 -->
<template>
  <div class="register">
    <a-form-model ref="ruleForm"
                  :model="registerForm"
                  :rules="rules"
                  v-bind="layout">
      <a-form-model-item has-feedback
                         label="用户名"
                         prop="userName">
        <a-input v-model="registerForm.userName"
                 type="text"
                 allowClear
                 autocomplete="off" />
      </a-form-model-item>
      <a-form-model-item has-feedback
                         label="密码："
                         allowClear
                         prop="pass">
        <a-input v-model="registerForm.pass"
                 type="password"
                 autocomplete="off" />
      </a-form-model-item>
      <a-form-model-item has-feedback
                         label="再次输入密码："
                         allowClear
                         prop="checkPass">
        <a-input v-model="registerForm.checkPass"
                 type="password"
                 autocomplete="off" />
      </a-form-model-item>
      <a-form-model-item has-feedback
                         label="手机号码："
                         allowClear
                         prop="tel">
        <a-input v-model="registerForm.tel"
                 type="text"
                 autocomplete="off" />
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary"
                  @click="submitForm('ruleForm')">
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
export default {
  data() {
    let validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'));
      } else {
        if (this.registerForm.checkPass !== '') {
          this.$refs.registerForm.validateField('userName');
        }
        callback();
      }
    }
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.registerForm.checkPass !== '') {
          this.$refs.registerForm.validateField('pass');
        }
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
    return {
      registerForm: {
        userName: '',
        pass: '',
        checkPass: '',
        tel: '',
      },
      rules: {
        userName: [{ required: true, validator: validateUsername, trigger: 'change' }],
        pass: [{ required: true, validator: validatePass, trigger: 'change' }],
        checkPass: [{ required: true, validator: validatePass2, trigger: 'change' }],
        tel: [{ required: true, validator: validatePass2, trigger: 'change' }],
      },
      layout: {
        labelCol: { span: 7 },
        wrapperCol: { span: 15 },
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped>
.register {
  margin-left: 8%;
  margin-top: 10%;
}
</style>