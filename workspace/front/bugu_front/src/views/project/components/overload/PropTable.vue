<template>
  <div>
    <a-table :columns="columns"
             :data-source="tableData"
             :scroll="{y:400,x:1000}"
             :bordered="false">

      <template v-for="col in ['name', 'token','type','value','description']"
                :slot="col"
                slot-scope="text, record">
        <!--  text:该单元格内容
              record:该行的数据
              index:索引      -->

        <div :key="col">
          <template v-if="record.editable">
            <a-input v-if="col === 'name'"
                     v-model="row.name" />
            <a-input v-if="col === 'token'"
                     v-model="row.token" />
            <a-select v-if="col === 'type'"
                      style="width:30%"
                      v-model="row.type1">
              <a-select-option v-for="item in typeList1"
                               :key="item.value"
                               :value="item.title">
                {{item.title}}
              </a-select-option>
            </a-select>
            <a-select v-if="col === 'type'"
                      style="width:40%"
                      v-model="row.type2">
              <a-select-option v-for="item in typeList2"
                               :key="item.value"
                               :value="item.title">
                {{item.title}}
              </a-select-option>
            </a-select>
            <template v-if="col === 'value'">
              <a-input-number v-model="row.value"
                              :precision="0"
                              :formatter="limitNumber"
                              :parser="limitNumber"
                              :min="-2147483648"
                              :max="2147483647"
                              v-if="record.type2 ==='整型'" />
              <a-input-number v-model="row.value"
                              :min="-Infinity"
                              :max="Infinity"
                              :step="0.1"
                              v-if="record.type2 ==='浮点型'" />
              <!-- v-model值为true or false  -->
              <a-switch v-model="row.value"
                        checked-children="true"
                        un-checked-children="false"
                        default-checked
                        v-if="record.type2 ==='布尔型'" />
              <a-input v-model="row.value"
                       v-if="record.type2 ==='字符型'"
                       :maxLength="1" />
              <a-input v-model="row.value"
                       v-if="record.type2 ==='字符串'" />
              <a-input v-model="row.value"
                       placeholder="输入数组成员，用逗号隔开"
                       v-if="record.type2 ==='数组'" />
              <!-- <a-input v-model="row.value"
                       placeholder="输入数组成员，用逗号隔开" /> -->
            </template>

            <a-input v-if="col === 'description'"
                     v-model="row.description" />
          </template>
          <template v-else>
            <template v-if="col === 'type'">
              <a-tag color="blue"
                     v-if="record.type1==='变量'">
                {{ record.type1 }}
              </a-tag>
              <a-tag color="red"
                     v-else-if="record.type1==='常量'">
                {{ record.type1 }}
              </a-tag>
              <!-- type2 -->
              <a-tag color="green"
                     v-if="record.type2==='整型'">
                {{record.type2}}
              </a-tag>
              <a-tag color="cyan"
                     v-else-if="record.type2==='浮点型'">
                {{record.type2}}
              </a-tag>
              <a-tag color="grey"
                     v-else-if="record.type2==='布尔型'">
                {{record.type2}}
              </a-tag>
              <a-tag color="orange"
                     v-else-if="record.type2==='字符型'">
                {{record.type2}}
              </a-tag>
              <a-tag color="yellow"
                     v-else-if="record.type2==='字符串'">
                {{record.type2}}
              </a-tag>
              <a-tag color="pink"
                     v-else-if="record.type2==='数组'">
                {{record.type2}}
              </a-tag>
            </template>
            <span v-else> {{ text }}</span>

          </template>

        </div>
      </template>

      <template slot="operation"
                slot-scope="text, record">
        <div class="editable-row-operations">
          <span v-if="record.editable">
            <a @click="() => save(record.key)"
               :disabled="saveStatus">保存</a>
            <a @click="()=> cancel(record.key)">取消</a>
          </span>
          <span v-else>
            <a :disabled="editingKey!==''"
               @click="()=> edit(record.key)">编辑</a>
            <a-popconfirm title="确定删除吗？"
                          @confirm="() => del(record.key)">
              <a :disabled="editingKey!==''">删除</a>
            </a-popconfirm>
            <a :disabled="addStatus"
               @click="add">新建</a>
          </span>
        </div>
      </template>
    </a-table>
  </div>
</template>
<script>
const columns = [
  {
    title: '参数名',
    dataIndex: 'name',
    key: 'name',
    align: "center",
    width: '15%',
    ellipsis: true,
    scopedSlots: { customRender: 'name' },
  },
  {
    title: '英文名',
    dataIndex: 'token',
    key: 'token',
    align: "center",
    width: '15%',
    ellipsis: true,
    scopedSlots: { customRender: 'token' },
  },
  {
    title: '类型',
    dataIndex: 'type',
    key: 'type',
    align: "center",
    width: '30%',
    ellipsis: true,
    scopedSlots: { customRender: 'type' },
  },
  {
    title: '默认值',
    dataIndex: 'value',
    key: 'value',
    align: "center",
    width: '15%',
    ellipsis: true,
    scopedSlots: { customRender: 'value' },
  },
  {
    title: '简介',
    width: "20%",
    dataIndex: 'description',
    key: 'description',
    align: "center",
    ellipsis: true,
    scopedSlots: { customRender: 'description' },
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: 150,
    key: 'operation',
    align: "center",
    fixed: 'right',
    ellipsis: true,
    scopedSlots: { customRender: 'operation' },
  },
];

export default {
  props: {
    data: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data() {
    // this.
    return {
      tableData: this.data,
      cacheData: [],
      saveStatus: false,
      addStatus: false,
      typeList1: [
        {
          title: "常量",
          value: "0",
        },
        {
          title: "变量",
          value: "1"
        },
      ],
      typeList2: [
        {
          title: "整型",
          value: "0",
        },
        {
          title: "浮点型",
          value: "1",
        },
        {
          title: "布尔型",
          value: "2",
        },
        {
          title: "字符型",
          value: "3",
        },
        {
          title: "字符串",
          value: "4",
        },
        {
          title: "数组",
          value: "5",
        },
      ],
      row: {
        name: "",
        token: "",
        type1: "",//变量or常量
        type2: "",//数据类型
        value: "",
        description: ""
      },
      rules: {
        name: [{ required: true, message: '请填写名称', trigger: 'change' }],
        token: [{ required: true, message: '请填写名称', trigger: 'change' }],
        type: [{ required: true, message: '请选择类别', trigger: 'change' }],
        value: [{ required: true, message: '请填写取值', trigger: 'change' }]
      },
      // data,
      columns,
      editingKey: '',
      editing: "",
      count: 0,
    };
  },
  methods: {
    // 只允许输入整数
    limitNumber(value) {
      if (typeof value === 'string') {
        return !isNaN(Number(value)) ? value.replace(/\./g, '') : -1
      } else if (typeof value === 'number') {
        return !isNaN(value) ? String(value).replace(/\./g, '') : -1
      } else {
        return 0
      }
    },
    add() {
      console.log("add被调用了")
      this.addStatus = true
      this.saveStatus = true
      this.count++
      this.editingKey = "add";
      this.row = {}
      this.tableData.push({
        key: this.count,
        name: "111",
        token: "",
        type1: "",
        type2: "",
        value: "0",
        description: "",
        editable: 1
      })
    },
    edit(key) {
      console.log("edit被调用了")
      this.addStatus = true
      const newData = [...this.tableData];
      //获取当前编辑的行
      console.log("cache", this.cacheData)
      const target = newData.find(item => key === item.key);
      this.editingKey = key;
      if (target) {
        target.editable = 1;//添加可编辑属性
        this.row = target
        this.tableData = newData
      }
    },
    save(key) {
      console.log("save被调用了")
      this.addStatus = false
      const newData = [...this.tableData]
      const newCacheData = [...this.cacheData];
      // console.log(newData)
      const target = newData.find(item => key === item.key)
      const targetCache = newCacheData.find(item => key === item.key);
      // console.log(targetCache)
      if (target && targetCache) {
        delete target.editable;//删除之前添加的可编辑属性
        this.tableData = newData
        Object.assign(targetCache, target);
        this.cacheData = newCacheData;
      }
      this.editingKey = ''
    },
    cancel(key) {
      console.log("cancel被调用了")
      this.addStatus = false
      const newData = [...this.tableData]
      // const newCacheData = [...this.cacheData];
      const target = newData.find(item => key === item.key)
      // const targetCache = newCacheData.find(item => key === item.key);
      this.editingKey = '';
      if (target) {
        // console.log(this.cache)
        // console.log(targetCache)
        Object.assign(target, this.cacheData.find(item => key === item.key));
        console.log(target)
        delete target.editable;
        this.tableData = newData
      }
    },
    // cancel(key) {
    //   const newData = [...this.tableData];
    //   const target = newData.find(item => key === item.key);
    //   this.editingKey = '';
    //   if (target) {
    //     Object.assign(target, this.cacheData.find(item => key === item.key));
    //     delete target.editable;
    //     this.tableData = newData;
    //   }
    // },
    del(key) {
      const newData = [...this.tableData].filter(item => item.key !== key);
      this.tableData = newData
      // this.tableData = this.tableData
    },
  },
  computed: {
    // cacheData: {
    //   get() {
    //     return this.tableData
    //   },
    //   set(value) {
    //     console.log("cacheData", this.cacheData)
    //     return value
    //   }
    // }
  },
  mounted() {
  },
  created() {
    this.cacheData = this.tableData.map(item => ({ ...item }))
  },
  watch: {
    row: {
      // immediate: true,
      deep: true,
      handler(newValue) {
        for (let i in newValue) {
          // console.log(newValue[i])
          if (newValue[i] === "") {
            if (i === "description") {
              this.saveStatus = false
            } else {
              this.$notification['warning']({
                key: "2",
                message: '请填写完整',
                duration: 3
              });
              this.saveStatus = true
            }
            break
          }
          else {
            this.saveStatus = false
          }
        }
      }
    },
    data(newValue) {
      console.log("tableData改变了")
      this.tableData = newValue
    }
  }
};
</script>
<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>
