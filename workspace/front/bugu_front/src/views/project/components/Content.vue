<!-- 内容组件 -->
<template>
  <div>
    <div style="padding:40vh;"
         v-if="panes.length === 0">
      <a-empty description="暂无方法编辑中" />
    </div>
    <a-tabs v-model="$store.state.content.activeKey"
            hide-add
            size="small"
            type="editable-card"
            @edit="onEdit"
            v-else>
      <a-tab-pane v-for="pane in $store.state.content.panes"
                  :key="pane.key"
                  :tab="pane.title"
                  :closable="pane.closable">
        <div class="content">
          <div v-for="(item,index) in 10"
               :key="index">
            <Card></Card>
          </div>
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import Card from './Card';
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
export default {
  //import引入的组件需要注入到对象中才能使用
  components: { Card },
  data() {
    //这里存放数据
    const panes = this.$store.state.content.panes
    return {
      // activeKey: panes[0].key,
      panes,
      newTabIndex: 0,
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    callback(key) {
      console.log(key);
    },
    //新增和删除(调用remove)页签的回调
    onEdit(targetKey, action) {
      //调用remove
      this[action](targetKey);
    },
    remove(targetKey) {
      let activeKey = this.$store.state.content.activeKey
      let lastIndex
      let panes = this.$store.state.content.panes
      panes.forEach((pane, i) => {
        if (pane.key === targetKey) {
          lastIndex = i - 1;
        }
      });
      this.$store.commit("REMOVE_KEYS", targetKey)
      this.$store.commit("REMOVE_PANES", targetKey)
      //更新当前展示中的选项卡
      panes = this.$store.state.content.panes
      if (panes.length && activeKey === targetKey) {
        if (lastIndex >= 0) {
          activeKey = panes[lastIndex].key;
        } else {
          activeKey = panes[0].key;
        }
      }
      this.$store.commit("SET_ACTIVE", activeKey)
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
.content {
  background: #fff;
  padding: 16px;
  height: 83.3vh;
  overflow-y: auto;
}
</style>