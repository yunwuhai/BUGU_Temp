<!-- 项目界面布局 -->
<template>
  <transition mode="out-in"
              appear
              appear-active-class="animate__animated animate__fadeIn">
    <div>
      <Init></Init>

      <Header></Header>
      <a-row class="row">
        <a-col :span="sliderSpan">
          <Slider></Slider>
        </a-col>
        <a-col :span="contentSpan"
               :class="transObj">
          <Content></Content>
        </a-col>
      </a-row>

      <Data></Data>
    </div>
  </transition>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Header from './components/layout/Header'
import Slider from './components/layout/Slider'
import Content from './components/layout/Content'
import Data from './components/data/Data'
import Init from './Init'
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    Header,
    Slider,
    Content,
    Data,
    Init
  },
  data() {
    //这里存放数据
    return {

    }
  },
  //监听属性 类似于data概念
  computed: {
    collapsed() {
      return this.$store.getters.collapsed
    },
    sliderSpan() {
      if (this.collapsed) {
        return 2
      }
      return 4
    },
    contentSpan() {
      if (this.collapsed) {
        return 22
      }
      return 20
    },
    transObj() {
      if (this.collapsed) {
        return {
          'animate__animated animate__fadeInLeft': false,
          'animate__animated animate__fadeInRight': true
        }
      }
      return {
        'animate__animated animate__fadeInLeft': true,
        'animate__animated animate__fadeInRight': false
      }
    }
  },
  //监控data中的数据变化
  watch: {

  },
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
<style scoped>
.row {
  margin: 10px 20px;
  background: rgb(240, 242, 245);
  min-height: 89vh;
}
/* 内容栏动画效果 */
.animate__animated.animate__fadeInRight {
  --animate-duration: 1s;
}
.animate__animated.animate__fadeInRight {
  --animate-duration: 1s;
}
</style>