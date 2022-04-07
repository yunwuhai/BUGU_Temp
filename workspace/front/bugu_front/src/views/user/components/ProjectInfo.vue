<!-- 项目界面 -->
<template>
  <div class=''>
    <a-button @click="createProject">新建工程</a-button>
    <Init></Init>
    <a-list class="comment-list"
            :header="`${data.length} replies`"
            item-layout="horizontal"
            :data-source="data">
      <a-list-item slot="renderItem"
                   slot-scope="item">
        <a-comment :author="item.author"
                   :avatar="item.avatar">
          <template slot="actions">
            <span v-for="(action,index) in item.actions"
                  :key="index">{{ action }}</span>
          </template>
          <p slot="content">
            {{ item.content }}
          </p>
          <a-tooltip slot="datetime"
                     :title="item.datetime.format('YYYY-MM-DD HH:mm:ss')">
            <span>{{ item.datetime.fromNow() }}</span>
          </a-tooltip>
        </a-comment>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import moment from 'moment';
import Init from '@/views/project/Init'
export default {
  //import引入的组件需要注入到对象中才能使用
  components: { Init },
  data() {
    //这里存放数据
    return {
      data: [
        {
          actions: ['Reply to'],
          author: 'Han Solo',
          avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          content:
            'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
          datetime: moment().subtract(1, 'days'),
        },
        {
          actions: ['Reply to'],
          author: 'Han Solo',
          avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          content:
            'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
          datetime: moment().subtract(2, 'days'),
        },
      ],
      moment,
    }
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    createProject() {
      this.$store.commit("SET_CREATEVISIBLE", true)
    },
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