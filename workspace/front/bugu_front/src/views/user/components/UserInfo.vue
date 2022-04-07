<!-- 个人信息 -->
<template>
  <div style="margin-top:10px">
    <a-row :gutter="16">
      <a-col :span="12">
        <a-card>
          <a-statistic title="Feedback"
                       :value="11.28"
                       :precision="2"
                       suffix="%"
                       :value-style="{ color: '#3f8600' }"
                       style="margin-right: 50px">
            <template #prefix>
              <a-icon type="arrow-up" />
            </template>
          </a-statistic>
        </a-card>
      </a-col>
      <a-col :span="12">
        <a-card>
          <a-statistic title="Idle"
                       :value="9.3"
                       :precision="2"
                       suffix="%"
                       class="demo-class"
                       :value-style="{ color: '#cf1322' }">
            <template #prefix>
              <a-icon type="arrow-down" />
            </template>
          </a-statistic>
        </a-card>
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
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {

  },
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