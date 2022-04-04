<!-- 初始化选择 -->
<template>
  <div class=''>
    <a-modal v-model="visible"
             title="新建项目"
             :closable="false"
             :maskClosable="false"
             @cancel="handleCancel"
             @ok="handleOk('ruleForm')">
      <a-form-model ref="ruleForm"
                    :model="initForm"
                    :rules="rules"
                    v-bind="layout">
        <a-form-model-item has-feedback
                           label="项目名称："
                           prop="name">
          <a-input v-model="initForm.name"
                   :autoFocus="true"
                   ref="name"
                   type="text"
                   allowClear
                   autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item label="项目类型："
                           prop="type">
          <a-radio-group name="type"
                         v-model="initForm.type"
                         ref="type">
            <a-radio value="1">
              组件
            </a-radio>
            <a-radio value="0">
              工程
            </a-radio>
          </a-radio-group>
        </a-form-model-item>
        <template v-if="initForm.type==='0'">
          <a-form-model-item has-feedback
                             label="芯片类型："
                             prop="chip">
            <a-select v-model="initForm.chip"
                      ref="chip"
                      allowClear
                      autocomplete="off">
              <a-select-option value="1">
                芯片1
              </a-select-option>
            </a-select>
          </a-form-model-item>

          <a-form-model-item has-feedback
                             label="堆栈大小："
                             prop="stack">
            <a-input v-model="initForm.stack"
                     ref="stack"
                     allowClear
                     type="password"
                     autocomplete="off"
                     @keyup.enter="handleOk('ruleForm')" />
          </a-form-model-item>
        </template>
        <template v-else>
          <a-form-model-item label="抽象组件："
                             prop="abstract">
            <a-radio-group name="abstract"
                           v-model="initForm.abstract"
                           ref="abstract"
                           @keyup.enter="handleOk('ruleForm')">
              <a-radio value="1">
                是
              </a-radio>
              <a-radio value="0">
                否
              </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </template>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  name: "Init",
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      visible: false,
      loading: false,
      initForm: {
        type: "0",
        name: '',
        stack: '',
        chip: '1',
        abstract: '0'
      },
      rules: {
        type: [{ required: true, message: "请选择项目类型", trigger: 'change' }],
        name: [{ required: true, message: "请输入项目名称", trigger: 'change' }],
        stack: [{ required: true, message: "请输入堆栈大小", trigger: 'change' }],
        chip: [{ required: true, message: "请选择芯片类型", trigger: 'change' }],
        abstract: [{ required: true, message: "请选择是否为抽象组件", trigger: 'change' }]
      },
      layout: {
        labelCol: { span: 7 },
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
    nextFocus(name) {
      this.$refs[name].focus()
    },
    handleOk(formName) {
      this.loading = true
      this.$refs[formName].validate(valid => {
        if (valid) {
          //在vuex中进行后端验证 返回promise
          // this.$store.dispatch('register', registerForm)

          this.$message.success('新建成功', 0.5)
          this.$bus.$emit('projectName', this.initForm.name)
          this.$bus.$emit('projectType', this.initForm.type)
          this.loading = false
          this.visible = false
          // alert('submit!');
        } else {
          this.$message.error('新建失败', 0.5)
          // alert('submit!');
          return false;
        }
      });
    },
    handleCancel() {
      // this.visible = true
      this.$router.push({ name: 'UserCenter' })
      this.$message.info('取消新建', 0.5)
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.visible = true
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