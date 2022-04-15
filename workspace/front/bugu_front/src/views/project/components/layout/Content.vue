<!-- 内容组件 -->
<template>
  <div>
    <a-tooltip placement="left"
               title="数据仓库">
      <a-button type="link"
                @click="displayData">
        <a-icon type="database" />
      </a-button>
    </a-tooltip>
    <div style="padding:30vh;"
         v-if="$store.getters.panes.length === 0">
      <a-empty description="暂无方法编辑中" />
    </div>
    <a-tabs v-model="$store.state.content.activeKey"
            hide-add
            size="small"
            type="editable-card"
            @edit="onEdit"
            v-else>
      <a-tab-pane v-for="pane in $store.getters.panes"
                  :key="pane.key"
                  :tab="pane.title"
                  :closable="pane.closable">
        <div class="card">
          <!-- <div v-for="(item,index) in 10"
               :key="index"> -->
          <!-- <a-collapse :bordered="trues">
            <a-collapse-panel key="1"
                              header="输入参数表">
              <PropTable :data="pane.contentIn"></PropTable>
            </a-collapse-panel>

            <a-collapse-panel key="3"
                              header="执行逻辑表">
              <PropTable :data="pane.contentLogic"></PropTable>
            </a-collapse-panel>
          </a-collapse> -->
          <a-collapse :bordered="true"
                      :style="customStyle">
            <template #expandIcon="props">
              <a-icon type="caret-right"
                      :rotate="props.isActive ? 90 : 0" />
            </template>
            <a-collapse-panel key="1">
              <template slot="header">
                <a-icon type="import"
                        style="margin-right:10px" />
                <span>输入参数表</span>
              </template>
              <!-- {{pane}} -->
              <PropTable :tableData="pane.contentIn"
                         :methodId="pane.key"
                         :tableType="'1'"></PropTable>
            </a-collapse-panel>
          </a-collapse>
          <a-collapse :bordered="true"
                      :style="customStyle">
            <template #expandIcon="props">
              <a-icon type="caret-right"
                      :rotate="props.isActive ? 90 : 0" />
            </template>
            <a-collapse-panel key="2">
              <template slot="header">
                <a-icon type="export"
                        style="margin-right:10px" />
                <span>输出参数表 </span>
              </template>
              <PropTable :tableData="pane.contentOut"
                         :methodId="pane.key"
                         :tableType="'2'"></PropTable>
            </a-collapse-panel>
          </a-collapse>
          <a-collapse :bordered="true"
                      :style="customStyle">
            <template #expandIcon="props">
              <a-icon type="caret-right"
                      :rotate="props.isActive ? 90 : 0" />
            </template>
            <a-collapse-panel key="3">
              <template slot="header">
                <a-icon type="ordered-list"
                        style="margin-right:10px" />
                <span>执行逻辑表 </span>
              </template>
              <PropTable :tableData="pane.contentLogic"></PropTable>
            </a-collapse-panel>
          </a-collapse>
          <!-- </div> -->
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import PropTable from '../overload/PropTable'
import dataApi from '@/api/data'
import { getUserInfo } from '@/utils/token'
export default {
  //import引入的组件需要注入到对象中才能使用
  components: { PropTable },
  data() {

    //这里存放数据
    // const panes = this.$store.getters.panes
    return {
      id: sessionStorage.getItem('projectId'),
      // activeKey: panes[0].key,
      // panes,
      newTabIndex: 0,
      customStyle:
        'border-radius: 4px; margin-bottom: 20px;overflow: hidden',
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    displayData() {
      /*
      向后端请求 总数据
      */
      this.$store.commit('SET_VISIBLE', true)
      this.$store.commit('SET_TITLE', "数据对象总仓库")
      this.$store.commit('SET_PLACEMENT', 'right')
      this.$store.commit('SET_WRAP', { marginTop: '64px' })
      this.$store.commit('SET_ADDSTATUS', false)
      dataApi.queryByEngin(getUserInfo().id, this.id)
        .then((res) => {
          if (res.code === 200) {
            this.$store.commit('SET_TABLEDATA', res.data)
          } else {
            this.$store.commit('CLEAR_TABLEDATA')
          }
        })
        .catch((err) => {
          console.error(err)
        })
    },
    callback(key) {
      console.log(key);
    },
    //新增和删除(调用remove)页签的回调
    onEdit(targetKey, action) {
      //调用remove
      this[action](targetKey);
    },
    remove(targetKey) {
      let activeKey = this.$store.getters.activeKey
      let lastIndex
      let panes = this.$store.getters.panes
      panes.forEach((pane, i) => {
        if (pane.key === targetKey) {
          lastIndex = i - 1;
        }
      });
      this.$store.commit("REMOVE_KEYS", targetKey)
      this.$store.commit("REMOVE_PANES", targetKey)
      //更新当前展示中的选项卡
      panes = this.$store.getters.panes
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
    // console.log('2', this.$store.getters.panes)
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
.card {
  background: #fff;
  padding: 16px;
  height: 83.3vh;
  overflow-y: auto;
}
.ant-btn {
  position: absolute;
  left: calc(100% - 40px);
  z-index: 50;
  margin-bottom: 0px;
  border: 0px;
  /* background: none; */
  height: 40px;
  color: rgb(89, 89, 89);
}
</style>