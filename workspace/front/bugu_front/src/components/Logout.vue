<!-- 注销按钮 -->
<template>
  <div class=''>
    <a-button type="link"
              style="float:right; margin: 16px 28px 16px 0;"
              @click="logout()">
      注销
    </a-button>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { removeToken, setLoginStatus, removeUserInfo, removeProjectInfo } from '@/utils/token'
import { resetRouter } from '../router'
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  name: 'Logout',
  data() {
    //这里存放数据
    return {

    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    logout() {
      this.$confirm({
        title: '确定要退出登录吗？',
        // content: 'Some descriptions',
        okText: '确定',
        okType: 'primary',
        cancelText: '取消',
        onOk: () => {
          removeToken()
          setLoginStatus(false)
          removeUserInfo()
          removeProjectInfo()
          this.$router.push({
            name: "Entrance"
          })
          resetRouter()
          this.$message.success("成功退出", 1)
        },
        onCancel: () => {
          this.$message.success("取消退出", 1)
        },
      });
      // this.$confirm('此操作将退出登录, 是否继续?', '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // })

    }
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
<style scoped>
</style>