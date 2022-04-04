<template>
  <div>
    <!-- <a-button class="editable-add-btn"
              @click="handleAdd">
      Add
    </a-button> -->
    <a-table :columns="columns"
             :data-source="$store.getters.tableData"
             :scroll="{y:400}"
             bordered>
      <template v-for="col in ['name', 'age', 'address']"
                :slot="col"
                slot-scope="text, record">
        <!-- text:该单元格内容
        record:该行的数据
        index:索引 -->
        <div :key="col">
          <a-input v-if="record.editable===1"
                   style="margin: -5px 0"
                   :value="text"
                   @change="e => handleChange(e.target.value, record.key, col)" />
          <a-select v-else-if="record.editable===2"
                    style="margin: -5px 0"
                    :value="text"
                    @change="e => handleChange(e.target.value, record.key, col)" />
          <template v-else>
            {{ text }}
            {{record}}
          </template>
        </div>
      </template>
      <template slot="operation"
                slot-scope="text, record">
        <div class="editable-row-operations">
          <span v-if="record.editable">
            <a @click="() => save(record.key)">保存</a>
            <a @click="() => cancel(record.key)">取消</a>
          </span>
          <span v-else>
            <a :disabled="editingKey!==''"
               @click="
                 ()=> edit(record.key)">编辑</a>
            <a-popconfirm title="确定删除吗？"
                          @confirm="() => del(record.key)">
              <a :disabled="editingKey!==''">删除</a>
            </a-popconfirm>
          </span>
        </div>
      </template>
    </a-table>
  </div>
</template>
<script>
const columns = [
  {
    title: 'name',
    dataIndex: 'name',
    width: '25%',
    scopedSlots: { customRender: 'name' },
  },
  {
    title: 'age',
    dataIndex: 'age',
    width: '15%',
    scopedSlots: { customRender: 'age' },
  },
  {
    title: 'address',
    dataIndex: 'address',
    width: '40%',
    scopedSlots: { customRender: 'address' },
  },
  {
    title: 'operation',
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' },
  },
];

// const data = [];
// for (let i = 0; i < 80; i++) {
//   data.push({
//     key: i.toString(),
//     name: `Edrward ${i}`,
//     age: 32,
//     address: `London Park no. ${i}`,
//   });
// }

export default {
  data() {
    // const data = this.$store.getters.tableData

    return {
      newRow: {
        name: "",
        age: "",
        address: ""
      },
      // data,
      columns,
      editingKey: '',
      editing: ""
    };
  },
  methods: {
    handleChange(value, key, column) {
      console.log(this.cacheData)
      console.log(value, key, column)
      const newData = [...this.$store.getters.tableData];
      const target = newData.find(item => key === item.key);
      if (target) {
        target[column] = value;
        this.$store.commit('SET_TABLEDATA', newData)
      }
    },
    edit(key) {
      const newData = [...this.$store.getters.tableData];
      const target = newData.find(item => key === item.key);
      this.editingKey = key;
      if (target) {
        target.editable = 1;//添加可编辑属性
        this.editing = key
        this.$store.commit('SET_TABLEDATA', newData)
      }
    },
    save(key) {
      const newData = [...this.$store.getters.tableData]
      const newCacheData = [...this.cacheData]
      const target = newData.find(item => key === item.key)
      const targetCache = newCacheData.find(item => key === item.key)
      // 比较修改后和修改前是不是一样的 不一样再进行修改
      if (target && targetCache) {
        delete target.editable;//删除之前添加的可编辑属性
        this.$store.commit('SET_TABLEDATA', newData)
        Object.assign(targetCache, target);
        this.cacheData = newCacheData;
      }
      this.editingKey = '';
      this.editing = ""
    },
    cancel(key) {
      const newData = [...this.$store.getters.tableData];
      const target = newData.find(item => key === item.key);
      this.editingKey = '';
      if (target) {
        Object.assign(target, this.cacheData.find(item => key === item.key));
        delete target.editable;
        this.$store.commit('SET_TABLEDATA', newData)
        this.editing = ""
      }
    },
    del(key) {
      const newData = [...this.$store.getters.tableData];
      this.$store.commit('SET_TABLEDATA', newData.filter(item => item.key !== key))
    },
    closeEdit() {
      this.cancel(this.editing)
    }
  },
  computed: {
    cacheData: {
      get() {
        return this.$store.getters.tableData
      },
      set(value) {
        return value
      }
    }
  },
  mounted() {
    this.$bus.$on("closeEdit", this.closeEdit)
  }
};
</script>
<style scoped>
.editable-add-btn {
  margin-bottom: 8px;
}
.editable-row-operations a {
  margin-right: 8px;
}
</style>
