<!-- 个人信息 -->
<template>
  <div style="margin-top:10px">
    <a-row :gutter="16">
      <a-col :span="14">
        <a-descriptions title="个人信息"
                        bordered>
          <a-descriptions-item label="用户名">
            {{userInfo.userName}}
          </a-descriptions-item>
          <a-descriptions-item label="昵称">
            {{userInfo.nickName}}
          </a-descriptions-item>
          <a-descriptions-item label="身份">
            {{userInfo.role ? "普通用户" : "管理员"}}
          </a-descriptions-item>
          <a-descriptions-item label="电话号码">
            {{userInfo.tel}}
          </a-descriptions-item>
          <a-descriptions-item label="注册时间">
            {{userInfo.createdAt}}
          </a-descriptions-item>
        </a-descriptions>
      </a-col>
      <a-col :span="10">
        <a-button @click="edit"
                  style="margin-bottom:11px">
          <span>修改个人信息</span>
        </a-button>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-card>
              <a-statistic title="Feedback"
                           :value="1128"
                           style="margin-right: 50px">
                <template #suffix>
                  <a-icon type="like" />
                </template>
              </a-statistic>
            </a-card>
          </a-col>
          <a-col :span="12">
            <a-card>
              <a-statistic title="Unmerged"
                           :value="93"
                           class="demo-class">
                <template #suffix>
                  <span> / 100</span>
                </template>
              </a-statistic>
            </a-card>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
    <a-row style="margin-top:20px">
      <a-col :span="7">
        <div :style="{ width: '300px', border: '1px solid #d9d9d9', borderRadius: '4px' }">
          <a-calendar :fullscreen="false" />
        </div>
      </a-col>
      <a-col :span="15">
        <a-timeline mode="alternate">
          <a-timeline-item>Create a services site 2015-09-01</a-timeline-item>
          <a-timeline-item color="green">
            Solve initial network problems 2015-09-01
          </a-timeline-item>
          <a-timeline-item>
            <a-icon slot="dot"
                    type="clock-circle-o"
                    style="font-size: 16px;" />
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
            laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto
            beatae vitae dicta sunt explicabo.
          </a-timeline-item>
          <a-timeline-item color="red">
            Network problems being solved 2015-09-01
          </a-timeline-item>
          <a-timeline-item>Create a services site 2015-09-01</a-timeline-item>
          <a-timeline-item>
            <a-icon slot="dot"
                    type="clock-circle-o"
                    style="font-size: 16px;" />
            Technical testing 2015-09-01
          </a-timeline-item>
        </a-timeline>
      </a-col>
    </a-row>
    <!-- 修改个人信息 -->
    <a-modal v-model="userVisible"
             title="修改个人信息"
             :closable="true"
             :maskClosable="false"
             @cancel="handleCancel"
             @ok="save('ruleForm')">
      <a-form-model ref="ruleForm"
                    :model="userForm"
                    :rules="rules"
                    v-bind="layout">
        <a-form-model-item has-feedback
                           label="昵称"
                           prop="nickName">
          <a-input v-model="userForm.nickName"
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
          <a-input v-model="userForm.userName"
                   type="text"
                   reg="userName"
                   placeholder="用于登录的账号"
                   allowClear
                   autocomplete="off"
                   @keyup.enter="nextFocus('newPass')" />
        </a-form-model-item>
        <a-form-model-item has-feedback
                           label="新密码："
                           prop="newPass">
          <a-input-password v-model="userForm.newPass"
                            allowClear
                            ref="newPass"
                            type="password"
                            autocomplete="off"
                            @keyup.enter="nextFocus('tel')" />
        </a-form-model-item>
        <a-form-model-item has-feedback
                           label="手机号码："
                           prop="tel">
          <a-input v-model="userForm.tel"
                   allowClear
                   type="text"
                   autocomplete="off"
                   @keyup.enter="submitForm('ruleForm')" />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { getUserInfo, setUserInfo, removeUserInfo } from '@/utils/token'
import userInfoApi from '@/api/userInfo'
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {

  },
  data() {
    //这里存放数据
    let validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'));
      }
      else if (value.length < 6 || value.length > 12) {
        callback(new Error('请输入6-12位用户名'));
      } else {
        callback()
      }
    }
    let validateNewPass = (rule, value, callback) => {
      if (value) {
        if (value.length < 6 || value.length > 12) {
          callback(new Error('请输入6-12位密码'));
        } else if (value === this.oldPass) {
          callback(new Error("密码不能与原密码相同"));
        }
        else {
          callback()
        }
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
      userInfo: {},
      userVisible: false,
      loading: false,
      userForm: {
        userName: '',
        nickName: '',
        newPass: '',
        tel: '',
      },
      oldPass: '',
      rules: {
        nickName: [{ required: true, message: "请输入昵称", trigger: 'change' }],
        userName: [{ required: true, validator: validateUsername, trigger: 'change' }],
        newPass: [{ required: false, validator: validateNewPass, trigger: 'change' }],
        tel: [{ required: true, validator: validateTel, trigger: 'change' }],
      },
      layout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 15 },
      },
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    getUser() {
      userInfoApi.queryById(getUserInfo().id)
        .then(res => {
          // console.log(res)
          if (res.code === 200) {
            this.userInfo = res.data
            this.userInfo.createdAt = res.data.createdAt.slice(0, 10) + " " + res.data.createdAt.slice(11, 19)
            this.oldPass = res.data.pass
          }
        })
    },
    edit() {
      this.userVisible = true
      this.userForm = Object.assign({}, this.userInfo)
    },
    save(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.userForm.pass = this.userForm.newPass ? this.userForm.newPass : this.oldPass
          delete this.userForm.newPass
          // console.log(this.userForm);
          userInfoApi.update(this.userForm)
            .then(res => {
              // console.log(res)
              if (res.code === 200) {
                this.$nextTick(
                  removeUserInfo(),
                  setUserInfo(res.data[0])
                )
                this.$message.success('修改成功', 0.5)
                this.getUser()
              } else {
                this.$message.error('修改失败', 0.5)
              }
            })
            .catch(err => {
              console.error(err)
              this.$message.error('修改失败', 0.5)
            })
          this.userVisible = false
        } else {
          this.$message.error('请输入完整', 0.5)
        }
      })
    },
    handleCancel() {
      this.userVisible = false
      this.$message.info('取消修改', 0.5)
      this.resetForm('ruleForm')
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getUser()
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
<style scoped>
</style>