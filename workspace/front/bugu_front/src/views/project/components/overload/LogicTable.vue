<template>
  <div>
    <a-config-provider>
      <template #renderEmpty>
        <a-empty description="暂无逻辑" />
        <a-button @click="add({})">新建</a-button>
      </template>
      <a-table :columns="columns"
               :data-source="data"
               :expanded-row-keys.sync="expandedRowKeys">
        <template slot="sentenceType"
                  slot-scope="text">
          {{text}}
        </template>
        <template slot="operation"
                  slot-scope="text, record">
          <div class="editable-dataForm-operations">
            <span>
              <a @click="add(record)">新建</a>
              <a @click="edit(record)">编辑</a>
              <a-popconfirm title="确定删除吗？"
                            @confirm="del(record)">
                <a>删除</a>
              </a-popconfirm>
            </span>
          </div>
        </template>
      </a-table>
    </a-config-provider>

    <!-- 添加语句 -->
    <a-modal v-model="addVisible"
             :width="600"
             title="新建语句"
             :closable="true"
             :maskClosable="false"
             @cancel="handleCancel"
             @ok="saveAdd('ruleForm')">
      <a-form-model ref="ruleForm"
                    :model="logicForm"
                    :rules="ruleForm"
                    v-bind="layout">
        <a-form-model-item has-feedback
                           label="语句类型："
                           prop="sentenceId">
          <a-cascader :options="options"
                      :allowClear="false"
                      @change="onChange"
                      v-model="logicForm.sentenceId" />
        </a-form-model-item>
        <!-- 计算语句 -->
        <template v-if="logicForm.sentenceId[2] && logicForm.sentenceId[2] > 0 && logicForm.sentenceId[2] <= 5">
          <a-form-model-item label="语句解释：">
            <span><b>依次填写目标数，左操作数，右操作数</b></span>
          </a-form-model-item>
          <a-form-model-item label="语句内容：">
            <a-select style="width: 35%"
                      placeholder="选择类型"
                      @change="typeChange">
              <a-select-option value="1">
                本类的属性
              </a-select-option>
              <a-select-option value="2">
                继承的属性
              </a-select-option>
            </a-select>
            <a-select v-model="calcContent.result"
                      placeholder="目标数据"
                      style="width: 65%">
              <a-select-option v-for="item in thisDatas"
                               :key="item.token">
                {{ item.name+' '+item.token }}
                <a-tag :color="getDataType(item.dataType).color">{{getDataType(item.dataType).type}}</a-tag>
              </a-select-option>
            </a-select>
            <a-select style="width: 35%"
                      placeholder="选择类型"
                      @change="typeChange1">
              <a-select-option value="0">
                直接输入
              </a-select-option>
              <a-select-option value="1">
                本类的属性
              </a-select-option>
              <a-select-option value="2">
                继承的属性
              </a-select-option>
            </a-select>
            <a-input v-model="calcContent.left"
                     v-if="calcInputLeft"
                     style="width: 65%"
                     placeholder="左操作数" />
            <a-select v-model="calcContent.left"
                      v-if="!calcInputLeft"
                      placeholder="选择数据"
                      style="width: 65%">
              <a-select-option v-for="item in thisDatasL"
                               :key="item.token">
                {{ item.name+' '+item.token }}
                <a-tag :color="getDataType(item.dataType).color">{{getDataType(item.dataType).type}}</a-tag>
              </a-select-option>
            </a-select>
            <a-select style="width: 35%"
                      placeholder="选择类型"
                      @change="typeChange2">
              <a-select-option value="0">
                直接输入
              </a-select-option>
              <a-select-option value="1">
                本类的属性
              </a-select-option>
              <a-select-option value="2">
                继承的属性
              </a-select-option>
            </a-select>
            <a-input v-model="calcContent.right"
                     v-if="calcInputRight"
                     style="width: 65%"
                     placeholder="右操作数" />
            <a-select v-model="calcContent.right"
                      v-if="!calcInputRight"
                      placeholder="选择数据"
                      style="width: 65%">
              <a-select-option v-for="item in thisDatasR"
                               :key="item.token">
                {{ item.name+' '+item.token }}
                <a-tag :color="getDataType(item.dataType).color">{{getDataType(item.dataType).type}}</a-tag>
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </template>
        <!-- 判断语句 -->
        <template v-if="logicForm.sentenceId[2] && logicForm.sentenceId[2] > 5 && logicForm.sentenceId[2] <= 9 ">
          <!-- <a-form-model-item label="语句内容：">

            <a-input v-model="calcContent.result"
                     placeholder="目标数" />
            <a-input v-model="calcContent.left"
                     placeholder="左操作数" />
            <a-input v-model="calcContent.right"
                     placeholder="右操作数" />
          </a-form-model-item> -->
        </template>
        <!-- 循环语句 -->
        <template v-if="logicForm.sentenceId[2] && logicForm.sentenceId[2] > 9 && logicForm.sentenceId[2] <= 12 ">
          <template v-if="logicForm.sentenceId[2] === 10">
            <a-form-model-item label="语句解释：">
              <span><b>包含的所有子语句将无限次执行</b></span>
            </a-form-model-item>
          </template>
          <template v-if="logicForm.sentenceId[2] === 11">
            <a-form-model-item label="语句解释：">
              <span><b>包含的所有子语句将执行限定次，输入次数</b></span>
            </a-form-model-item>
            <a-form-model-item label="语句内容：">
              <a-input-number v-model="loopCount"
                              placeholder="输入次数" />
            </a-form-model-item>
          </template>
          <template v-if="logicForm.sentenceId[2] === 12">
            <a-form-model-item label="语句解释：">
              <span><b>满足语句内容中的条件才执行包含的子语句</b></span>
            </a-form-model-item>
            <a-form-model-item label="语句内容：">
              <a-select style="width: 33%"
                        placeholder="选择类型"
                        @change="loopChange">
                <a-select-option value="0">
                  直接输入
                </a-select-option>
                <a-select-option value="1">
                  本类的属性
                </a-select-option>
                <a-select-option value="2">
                  继承的属性
                </a-select-option>
              </a-select>
              <a-input v-model="loopContent[0].condition"
                       v-if="loopInput"
                       style="width: 53%"
                       placeholder="输入数据" />
              <a-select v-model="loopContent[0].condition"
                        v-if="!loopInput"
                        placeholder="选择数据"
                        style="width: 53%">
                <a-select-option v-for="item in loopDatas"
                                 :key="item.token">
                  {{ item.name+' '+item.token }}
                  <a-tag :color="getDataType(item.dataType).color">{{getDataType(item.dataType).type}}</a-tag>
                </a-select-option>
              </a-select>
              <a-button type="link">
                <a-icon type="minus-circle"
                        theme="twoTone" />
              </a-button>
            </a-form-model-item>

          </template>
        </template>
        <!-- 跳跃语句 -->
        <template v-if="logicForm.sentenceId[2] && logicForm.sentenceId[2] > 12 && logicForm.sentenceId[2] <= 15 ">
          <a-form-model-item label="语句解释：">
            <template v-if="logicForm.sentenceId[2]===13">
              <span><b>continue 进行下一次循环</b></span>
            </template>
            <template v-if="logicForm.sentenceId[2]===14">
              <span><b>break 结束此次循环</b></span>
            </template>
            <template v-if="logicForm.sentenceId[2]===15">
              <span><b>方法的结束 以下的语句不执行</b></span>
            </template>
          </a-form-model-item>
        </template>
        <!-- 赋值语句 -->
        <template v-if="logicForm.sentenceId[2] && logicForm.sentenceId[2] > 15 && logicForm.sentenceId[2] <= 19 ">
          <a-form-model-item label="语句解释：">
            <span><b>下列先选择需要被赋值的量，再选择赋值的方式</b></span>
          </a-form-model-item>
          <a-form-model-item label="语句内容：">
            <a-select style="width: 35%"
                      placeholder="选择类型"
                      @change="assignChange">
              <a-select-option value="1">
                本类的属性
              </a-select-option>
              <a-select-option value="2">
                继承的属性
              </a-select-option>
            </a-select>
            <a-select placeholder="选择需要被赋值的属性"
                      v-model="assignContent.left"
                      style="width: 65%">
              <a-select-option v-for="item in assignDatas"
                               :key="item.token">
                {{ item.name+' '+item.token }}
                <a-tag :color="getDataType(item.dataType).color">{{getDataType(item.dataType).type}}</a-tag>
              </a-select-option>
            </a-select>
            <template v-if="logicForm.sentenceId[2] && logicForm.sentenceId[2] === 16">
              <a-input v-model="assignContent.right"
                       placeholder="输入值" />
            </template>
            <template v-if="logicForm.sentenceId[2] && logicForm.sentenceId[2] === 17">
              <a-select v-model="assignContent.right"
                        placeholder="选择用于赋值的属性">
                <a-select-option v-for="item in assignDatas"
                                 :key="item.token">
                  {{ item.name+' '+item.token }}
                  <a-tag :color="getDataType(item.dataType).color">{{getDataType(item.dataType).type}}</a-tag>
                </a-select-option>
              </a-select>
            </template>
            <template v-if="logicForm.sentenceId[2] && logicForm.sentenceId[2] === 18">
              <a-select v-model="assignContent.right"
                        placeholder="选择用于赋值的输入参数">
                <a-select-option v-for="item in assignInDatas"
                                 :key="item.token">
                  {{ item.name+' '+item.token }}
                  <a-tag :color="getDataType(item.dataType).color">{{getDataType(item.dataType).type}}</a-tag>
                </a-select-option>
              </a-select>
            </template>
            <template v-if="logicForm.sentenceId[2] && logicForm.sentenceId[2] === 19">
              <a-select style="width: 35%"
                        placeholder="选择类型"
                        @change="assignChange1">
                <a-select-option value="1">
                  本类方法
                </a-select-option>
                <a-select-option value="2">
                  父类方法
                </a-select-option>
              </a-select>
              <a-select v-model="assignContent.right"
                        style="width: 65%"
                        placeholder="选择已有方法">
                <a-select-option v-for="item in assignMethods"
                                 :key="item.token"
                                 @click="assignChange2(item.id)">
                  {{ item.name+' '+item.token }}
                </a-select-option>
              </a-select>
              <!-- 输入输出参数输入 -->
              <template v-for="item1 in assignInProps">
                <a-input v-model="item1.defaultV"
                         :key="item1.id"
                         placeholder="输入值" />
              </template>
              <template v-for="item2 in assignOutProps">
                <a-input v-model="item2.defaultV"
                         :key="item2.id"
                         placeholder="输入值" />
              </template>
            </template>
          </a-form-model-item>
        </template>

        <a-form-model-item label="语句层级："
                           v-if="levelDis">
          <a-radio-group v-model="level"
                         :defaultValue="level">
            <a-radio :value="true">
              同级语句
            </a-radio>
            <a-radio :value="false">
              子语句
            </a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item has-feedback
                           label="简介："
                           prop="description">
          <a-textarea placeholder="语句简单介绍"
                      v-model="logicForm.description"
                      @keyup.enter="handleOk('ruleForm')"
                      allowClear
                      :rows="3" />
        </a-form-model-item>
      </a-form-model>
    </a-modal>

    <!-- 修改语句 -->
    <a-modal v-model="editVisible"
             title="修改语句"
             :closable="true"
             :maskClosable="false"
             :width="600"
             @cancel="handleCancel"
             @ok="saveEdit('ruleForm')">
      <a-form-model ref="ruleForm"
                    :model="logicForm"
                    :rules="ruleForm"
                    v-bind="layout">
        <a-form-model-item has-feedback
                           label="语句类型："
                           prop="sentenceId">
          <a-cascader :options="options"
                      placeholder="选择语句类型"
                      :allowClear="false"
                      v-model="logicForm.sentenceId"
                      @change="onChange" />
        </a-form-model-item>

        <!-- 计算语句 -->
        <template v-if="logicForm.sentenceId[2] && logicForm.sentenceId[2] > 0 && logicForm.sentenceId[2] <= 5">
          <a-form-model-item label="语句解释：">
            <span><b>依次填写目标数，左操作数，右操作数</b></span>
          </a-form-model-item>
          <a-form-model-item label="语句内容：">
            <a-select style="width: 35%"
                      placeholder="选择类型"
                      @change="typeChange">
              <a-select-option value="1">
                本类的属性
              </a-select-option>
              <a-select-option value="2">
                继承的属性
              </a-select-option>
            </a-select>
            <a-select v-model="calcContent.result"
                      placeholder="目标数据"
                      style="width: 65%">
              <a-select-option v-for="item in thisDatas"
                               :key="item.token">
                {{ item.name+' '+item.token }}
                <a-tag :color="getDataType(item.dataType).color">{{getDataType(item.dataType).type}}</a-tag>
              </a-select-option>
            </a-select>
            <a-select style="width: 35%"
                      placeholder="选择类型"
                      @change="typeChange1">
              <a-select-option value="0">
                直接输入
              </a-select-option>
              <a-select-option value="1">
                本类的属性
              </a-select-option>
              <a-select-option value="2">
                继承的属性
              </a-select-option>
            </a-select>
            <a-input v-model="calcContent.left"
                     v-if="calcInputLeft"
                     style="width: 65%"
                     placeholder="左操作数" />
            <a-select v-model="calcContent.left"
                      v-if="!calcInputLeft"
                      placeholder="选择数据"
                      style="width: 65%">
              <a-select-option v-for="item in thisDatasL"
                               :key="item.token">
                {{ item.name+' '+item.token }}
                <a-tag :color="getDataType(item.dataType).color">{{getDataType(item.dataType).type}}</a-tag>
              </a-select-option>
            </a-select>
            <a-select style="width: 35%"
                      placeholder="选择类型"
                      @change="typeChange2">
              <a-select-option value="0">
                直接输入
              </a-select-option>
              <a-select-option value="1">
                本类的属性
              </a-select-option>
              <a-select-option value="2">
                继承的属性
              </a-select-option>
            </a-select>
            <a-input v-model="calcContent.right"
                     v-if="calcInputRight"
                     style="width: 65%"
                     placeholder="右操作数" />
            <a-select v-model="calcContent.right"
                      v-if="!calcInputRight"
                      placeholder="选择数据"
                      style="width: 65%">
              <a-select-option v-for="item in thisDatasR"
                               :key="item.token">
                {{ item.name+' '+item.token }}
                <a-tag :color="getDataType(item.dataType).color">{{getDataType(item.dataType).type}}</a-tag>
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </template>
        <!-- 判断语句 -->
        <template v-if="logicForm.sentenceId[2] && logicForm.sentenceId[2] > 5 && logicForm.sentenceId[2] <= 9 ">
          <!-- <a-form-model-item label="语句内容：">

            <a-input v-model="calcContent.result"
                     placeholder="目标数" />
            <a-input v-model="calcContent.left"
                     placeholder="左操作数" />
            <a-input v-model="calcContent.right"
                     placeholder="右操作数" />
          </a-form-model-item> -->
        </template>
        <!-- 循环语句 -->
        <template v-if="logicForm.sentenceId[2] && logicForm.sentenceId[2] > 9 && logicForm.sentenceId[2] <= 12 ">
          <template v-if="logicForm.sentenceId[2] === 10">
            <a-form-model-item label="语句解释：">
              <span><b>包含的所有子语句将无限次执行</b></span>
            </a-form-model-item>
          </template>
          <template v-if="logicForm.sentenceId[2] === 11">
            <a-form-model-item label="语句解释：">
              <span><b>包含的所有子语句将执行限定次，输入次数</b></span>
            </a-form-model-item>
            <a-form-model-item label="语句内容：">
              <a-input-number v-model="loopCount"
                              placeholder="输入次数" />
            </a-form-model-item>
          </template>
          <template v-if="logicForm.sentenceId[2] === 12">
            <a-form-model-item label="语句解释：">
              <span><b>满足语句内容中的条件才执行包含的子语句</b></span>
            </a-form-model-item>
            <a-form-model-item label="语句内容：">
              <a-select style="width: 33%"
                        placeholder="选择类型"
                        @change="loopChange">
                <a-select-option value="0">
                  直接输入
                </a-select-option>
                <a-select-option value="1">
                  本类的属性
                </a-select-option>
                <a-select-option value="2">
                  继承的属性
                </a-select-option>
              </a-select>
              <a-input v-model="loopContent[0].condition"
                       v-if="loopInput"
                       style="width: 53%"
                       placeholder="输入数据" />
              <a-select v-model="loopContent[0].condition"
                        v-if="!loopInput"
                        placeholder="选择数据"
                        style="width: 53%">
                <a-select-option v-for="item in loopDatas"
                                 :key="item.token">
                  {{ item.name+' '+item.token }}
                  <a-tag :color="getDataType(item.dataType).color">{{getDataType(item.dataType).type}}</a-tag>
                </a-select-option>
              </a-select>
              <a-button type="link">
                <a-icon type="minus-circle"
                        theme="twoTone" />
              </a-button>
            </a-form-model-item>

          </template>
        </template>
        <!-- 跳跃语句 -->
        <template v-if="logicForm.sentenceId[2] && logicForm.sentenceId[2] > 12 && logicForm.sentenceId[2] <= 15 ">
          <a-form-model-item label="语句解释：">
            <template v-if="logicForm.sentenceId[2]===13">
              <span><b>continue 进行下一次循环</b></span>
            </template>
            <template v-if="logicForm.sentenceId[2]===14">
              <span><b>break 结束此次循环</b></span>
            </template>
            <template v-if="logicForm.sentenceId[2]===15">
              <span><b>方法的结束 以下的语句不执行</b></span>
            </template>
          </a-form-model-item>
        </template>
        <!-- 赋值语句 -->
        <template v-if="logicForm.sentenceId[2] && logicForm.sentenceId[2] > 15 && logicForm.sentenceId[2] <= 19 ">
          <a-form-model-item label="语句解释：">
            <span><b>下列先选择需要被赋值的量，再选择赋值的方式</b></span>
          </a-form-model-item>
          <a-form-model-item label="语句内容：">
            <a-select style="width: 35%"
                      placeholder="选择类型"
                      @change="assignChange">
              <a-select-option value="1">
                本类的属性
              </a-select-option>
              <a-select-option value="2">
                继承的属性
              </a-select-option>
            </a-select>
            <a-select placeholder="选择需要被赋值的属性"
                      v-model="assignContent.left"
                      style="width: 65%">
              <a-select-option v-for="item in assignDatas"
                               :key="item.token">
                {{ item.name+' '+item.token }}
                <a-tag :color="getDataType(item.dataType).color">{{getDataType(item.dataType).type}}</a-tag>
              </a-select-option>
            </a-select>
            <template v-if="logicForm.sentenceId[2] && logicForm.sentenceId[2] === 16">
              <a-input v-model="assignContent.right"
                       placeholder="输入值" />
            </template>
            <template v-if="logicForm.sentenceId[2] && logicForm.sentenceId[2] === 17">
              <a-select v-model="assignContent.right"
                        placeholder="选择用于赋值的属性">
                <a-select-option v-for="item in assignDatas"
                                 :key="item.token">
                  {{ item.name+' '+item.token }}
                  <a-tag :color="getDataType(item.dataType).color">{{getDataType(item.dataType).type}}</a-tag>
                </a-select-option>
              </a-select>
            </template>
            <template v-if="logicForm.sentenceId[2] && logicForm.sentenceId[2] === 18">
              <a-select v-model="assignContent.right"
                        placeholder="选择用于赋值的输入参数">
                <a-select-option v-for="item in assignInDatas"
                                 :key="item.token">
                  {{ item.name+' '+item.token }}
                  <a-tag :color="getDataType(item.dataType).color">{{getDataType(item.dataType).type}}</a-tag>
                </a-select-option>
              </a-select>
            </template>
            <template v-if="logicForm.sentenceId[2] && logicForm.sentenceId[2] === 19">
              <a-select style="width: 35%"
                        placeholder="选择类型"
                        @change="assignChange1">
                <a-select-option value="1">
                  本类方法
                </a-select-option>
                <a-select-option value="2">
                  父类方法
                </a-select-option>
              </a-select>
              <a-select v-model="assignContent.right"
                        style="width: 65%"
                        placeholder="选择已有方法">
                <a-select-option v-for="item in assignMethods"
                                 :key="item.token"
                                 @click="assignChange2(item.id)">
                  {{ item.name+' '+item.token }}
                </a-select-option>
              </a-select>
              <!-- 输入输出参数输入 -->
              <template v-for="item1 in assignInProps">
                <a-input v-model="item1.defaultV"
                         :key="item1.id"
                         placeholder="输入值" />
              </template>
              <template v-for="item2 in assignOutProps">
                <a-input v-model="item2.defaultV"
                         :key="item2.id"
                         placeholder="输入值" />
              </template>
            </template>
          </a-form-model-item>
        </template>

        <a-form-model-item has-feedback
                           label="简介："
                           prop="description">
          <a-textarea placeholder="语句简单介绍"
                      v-model="logicForm.description"
                      @keyup.enter="handleOk('ruleForm')"
                      allowClear
                      :rows="3" />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>
<script>
const columns = [
  {
    title: '语句类型',
    dataIndex: 'sentenceType',
    key: 'sentenceType',
    scopedSlots: { customRender: 'sentenceType' },
    ellipsis: true,
  },
  {
    title: '简介',
    dataIndex: 'description',
    key: 'age',
    width: '50%',
    align: "center",
    ellipsis: true,
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    align: "center",
    ellipsis: true,
    scopedSlots: { customRender: 'operation' },
  },
];

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);
  },
};
import logicApi from '@/api/logic'
import dataApi from '@/api/data'
import methodApi from '@/api/method'
import { nanoid } from 'nanoid';
import { getUserInfo } from "@/utils/token"

export default {
  props: {
    tableData: {
      type: Array,
      default: function () {
        return []
      }
    },
    methodId: {
      type: Number
    },
    classId: {
      type: Number
    },
  },
  data() {
    return {
      // 级联选择框
      options: [
        {
          value: 0,
          label: '基本操作',
          children: [
            {
              value: 1,
              label: '计算',
              children: [
                {
                  value: 1,
                  label: '加',
                },
                {
                  value: 2,
                  label: '减',
                },
                {
                  value: 3,
                  label: '乘',
                },
                {
                  value: 4,
                  label: '除',
                },
                {
                  value: 5,
                  label: '取余',
                },
              ],
            },
            {
              value: 2,
              label: '判断',
              children: [
                {
                  value: 6,
                  label: '单选判断',
                },
                {
                  value: 7,
                  label: '多选判断',
                },
                {
                  value: 8,
                  label: '终选判断',
                },
                {
                  value: 9,
                  label: '枚举判断',
                },
              ],
            },
            {
              value: 3,
              label: '循环',
              children: [
                {
                  value: 10,
                  label: '无限循环',
                },
                {
                  value: 11,
                  label: '计次循环',
                },
                {
                  value: 12,
                  label: '判断循环',
                },
              ],
            },
            {
              value: 4,
              label: '跳跃',
              children: [
                {
                  value: 13,
                  label: '跳过循环',
                },
                {
                  value: 14,
                  label: '跳出循环',
                },
                {
                  value: 15,
                  label: '跳出重载',
                },
              ],
            },
            {
              value: 5,
              label: '赋值',
              children: [
                {
                  value: 16,
                  label: '直接输入赋值',
                },
                {
                  value: 17,
                  label: '类属性赋值',
                },
                {
                  value: 18,
                  label: '输入参数赋值',
                },
                {
                  value: 19,
                  label: '方法输出赋值',
                },
              ]
            }
          ],
        },
        {
          value: 2,
          label: '已有方法',
          children: [
            {
              value: 20,
              label: '本类的方法',
              children: this.classMethods
            },
            {
              value: 21,
              label: '继承的方法',
              children: this.extendMethods
            },
            // {
            //   value: 22,
            //   label: '类成员方法',
            //   children: this.propMethods
            // },
            // {
            //   value: 23,
            //   label: '输入参数方法',
            //   children: this.inMethods
            // },
          ],
        },
      ],
      level: true,// 同级或下一级
      levelDis: true,
      layout: {
        labelCol: { span: 5 },
        wrapperCol: { span: 17 },
      },//对话框布局
      addVisible: false,
      editVisible: false,
      logicForm: {
        key: nanoid(),
        sentenceId: [],
        sentenceType: "",
        description: ""
      },
      ruleForm: {
        sentenceId: [{ required: true, message: '选择语句类型', trigger: 'change' }],
        // level: [{ required: true, message: '选择语句层级', trigger: 'change' }],
      },
      id: sessionStorage.getItem('projectId'), // 项目id
      data: this.tableData,
      nowKey: "",
      nowRow: {},
      columns,
      rowSelection,
      expandedRowKeys: [],
      classMethods: [],//本类中定义的方法
      extendMethods: [],//父类的方法
      propMethods: [],// 类作为成员带来的方法
      inMethods: [],//类作为输入参数带来的方法

      // 计算语句
      thisDatas: [],// 本类的参数
      thisDatasR: [],// 本类的参数
      thisDatasL: [],// 本类的参数
      calcInputLeft: true,
      calcInputRight: true,
      calcContent: { result: "", left: "", right: "" },

      // 循环语句
      loopCount: 0,
      loopInput: true,
      loopDatas: [],
      loopContent: [{ condition: "", relationship: "" }],
      // 赋值语句
      assignDatas: [],
      assignInDatas: [],// 输入参数选择
      assignMethods: [],// 方法选择
      assignInProps: [],// 输入参数填写
      assignOutProps: [],// 输出参数填写
      assignInput: true,
      assignContent: { left: "", right: "" }
    };
  },
  methods: {
    getDataType(type) {
      if (type === '0') {
        return { color: "green", type: "整型" }
      }
      if (type === '1') {
        return { color: "cyan", type: "浮点型" }
      }
      if (type === '2') {
        return { color: "grey", type: "布尔型" }
      }
      if (type === '3') {
        return { color: "orange", type: "字符型" }
      }
      if (type === '4') {
        return { color: "yellow", type: "字符串" }
      }
      if (type === '5') {
        return { color: "pink", type: "数组" }
      }
    },
    setSentenceContent(id) {
      id = +id
      // console.log(typeof id)
      if (id <= 5) {
        this.logicForm.sentenceContent = this.calcContent
      }
      if (id > 5 && id <= 9) {
        console.log(11);
      }
      // 循环
      if (id > 9 && id <= 12) {
        if (id === 11) {
          this.logicForm.sentenceContent = this.loopCount
        }
      }
      // 跳跃 没有语句内容
      if (id > 12 && id <= 15) {
        if (this.logicForm.sentenceContent !== undefined) {
          delete this.logicForm.sentenceContent
        }
      }
      if (id > 15 && id <= 19) {
        this.logicForm.sentenceContent = this.assignContent
      }
    },
    getClassDatas(result) {
      dataApi.queryByClass(getUserInfo().id, this.classId)
        .then(res => {
          if (res.code === 200) {
            result = res.data
          }
        })
      console.log(result);
    },
    getParentDatas(result) {
      dataApi.getParentDatas(this.classId)
        .then(res => {
          // console.log(result)
          if (res.code === 200) {
            result = res.data
          }
        })
      console.log(result);
    },

    // 赋值语句
    assignChange(value) {
      if (value === '1') {
        dataApi.queryByClass(getUserInfo().id, this.classId)
          .then(res => {
            if (res.code === 200) {
              this.assignDatas = res.data
            }
          })
      }
      if (value === '2') {
        dataApi.getParentDatas(this.classId)
          .then(res => {
            // console.log(result)
            if (res.code === 200) {
              this.assignDatas = res.data
            }
          })
      }
    },
    assignChange1(value) {
      if (value === '1') {
        methodApi.getClassMethod({ cid: this.classId, mid: this.methodId })
          .then(res => {
            if (res.code === 200) {
              this.assignMethods = res.data
            }
          })
      }
      if (value === '2') {
        methodApi.getParentMethod(this.classId)
          .then(res => {
            // console.log(result)
            if (res.code === 200) {
              this.assignMethods = res.data
            }
          })
      }
    },
    assignChange2(id) {
      dataApi.getInOrOut(id, "1")
        .then(res => {
          if (res.code === 200) {
            this.assignInProps = res.data
          }
        })
      dataApi.getInOrOut(id, "2")
        .then(res => {
          if (res.code === 200) {
            this.assignOutProps = res.data
          }
        })
    },

    // 循环语句
    loopChange(value) {
      if (value === '0') {
        this.loopInput = true
      }
      if (value === '1') {
        this.loopInput = false
        dataApi.queryByClass(getUserInfo().id, this.classId)
          .then(res => {
            if (res.code === 200) {
              this.loopDatas = res.data
            }
          })
      }
      if (value === '2') {
        this.loopInput = false
        dataApi.getParentDatas(this.classId)
          .then(res => {
            // console.log(result)
            if (res.code === 200) {
              this.loopDatas = res.data
            }
          })
      }
    },

    // 计算语句
    typeChange(value) {
      // console.log(value)
      if (value === '1') {
        dataApi.queryByClass(getUserInfo().id, this.classId)
          .then(res => {
            if (res.code === 200) {
              this.thisDatas = res.data
            }
          })
      }
      if (value === '2') {
        dataApi.getParentDatas(this.classId)
          .then(res => {
            // console.log(result)
            if (res.code === 200) {
              this.thisDatas = res.data
            }
          })
      }
    },
    typeChange1(value) {
      // console.log(value)
      if (value === '0') {
        this.calcInputLeft = true
      }
      if (value === '1') {
        this.calcInputLeft = false
        dataApi.queryByClass(getUserInfo().id, this.classId)
          .then(res => {
            if (res.code === 200) {
              this.thisDatasL = res.data
            }
          })
      }
      if (value === '2') {
        this.calcInputLeft = false
        dataApi.getParentDatas(this.classId)
          .then(res => {
            // console.log(result)
            if (res.code === 200) {
              this.thisDatasL = res.data
            }
          })
      }
    },
    typeChange2(value) {
      if (value === '0') {
        this.calcInputRight = true
      }
      if (value === '1') {
        this.calcInputRight = false
        dataApi.queryByClass(getUserInfo().id, this.classId)
          .then(res => {
            if (res.code === 200) {
              this.thisDatasR = res.data
            }
          })
      }
      if (value === '2') {
        this.calcInputRight = false
        dataApi.getParentDatas(this.classId)
          .then(res => {
            // console.log(result)
            if (res.code === 200) {
              this.thisDatasR = res.data
            }
          })
      }
    },
    onChange(value, record) {
      this.logicForm.sentenceType = ""
      record.forEach(item => {
        this.logicForm.sentenceType += (item.label + ' / ')
      });
      this.logicForm.sentenceType = this.logicForm.sentenceType.substring(0, this.logicForm.sentenceType.length - 2)
      this.logicForm.sentenceId = value
      console.log(this.logicForm.sentenceId[2])
      if (this.logicForm.sentenceId[2] === 18) {
        // 获取输入参数
        dataApi.getInOrOut(this.methodId, '1')
          .then(res => {
            if (res.code === 200) {
              this.assignInDatas = res.data
              // console.log(this.assignInDatas)
            }
          })
      }
    },
    // findTypeId(type) {
    //   for (let i = 0; i < this.senTypeList.length; i++) {
    //     if (this.senTypeList[i].title === type) {
    //       return this.senTypeList[i].value
    //     }
    //   }
    // },

    // 删除逻辑
    filterData(data, key) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].key === key) {
          data.splice(i, 1)
          return
        }
        if (data[i].children !== undefined) {
          if (data[i].children.length) {
            this.filterData(data[i].children, key)
          } else {
            delete data[i].children
          }
        }
      }
    },
    del(record) {
      this.filterData(this.data, record.key)
      // console.log(this.data);
      let req = {
        eid: +this.id,
        cid: this.classId,
        mid: this.methodId,
        data: this.data
      }
      this.$store.commit('UPDATE_LOGIC', this.data)
      logicApi.deleteLogic(req)
        .then((res) => {
          // console.log(res)
          if (res.code === 200) {
            this.data = res.data
            this.$message.success("删除成功", 0.5)
          } else {
            this.$message.error("删除失败", 0.5)
          }
        })
        .catch(() => {
          this.$message.error('新建失败', 0.5)
          this.resetForm('ruleForm')
        })
    },
    // 添加逻辑
    findLevel(data, key) {
      // console.log(this.logic + Form)
      for (let i = 0; i < data.length; i++) {
        if (data[i].key === key) {
          this.setSentenceContent(this.logicForm.sentenceId[2])
          // 同级
          if (this.level) {
            data.push({
              key: nanoid(),
              sentenceId: this.logicForm.sentenceId,
              sentenceType: this.logicForm.sentenceType,
              sentenceContent: this.logicForm.sentenceContent,
              description: this.logicForm.description
            })
          }
          // 下一级 
          else {
            if (data[i].children === undefined) {
              data[i].children = []
            }
            data[i].children.push({
              key: nanoid(),
              sentenceId: this.logicForm.sentenceId,
              sentenceType: this.logicForm.sentenceType,
              sentenceContent: this.logicForm.sentenceContent,
              description: this.logicForm.description
            })
          }
          return
        }
        if (data[i].children !== undefined) {
          if (data[i].children.length) {
            this.findLevel(data[i].children, key)
          }
        }
      }
    },
    add(record) {
      if (this.data.length) {
        this.levelDis = true
      } else {
        this.levelDis = false
      }
      if (record.key) {
        this.nowKey = record.key
      } else {
        this.nowKey = ""
      }
      this.calcContent = {}
      this.logicForm = {
        key: nanoid(),
        sentenceId: [],
        sentenceType: "",
        description: ""
      }
      this.addVisible = true
    },
    saveAdd(formName) {
      if (this.nowKey) {
        this.findLevel(this.data, this.nowKey)
      } else {
        this.setSentenceContent(this.logicForm.sentenceId[2])
        // console.log(this.logicForm.sentenceContent);
        this.data.push({
          key: nanoid(),
          sentenceId: this.logicForm.sentenceId,
          sentenceType: this.logicForm.sentenceType,
          sentenceContent: this.logicForm.sentenceContent,
          description: this.logicForm.description
        })
      }

      let req = {
        eid: +this.id,
        cid: this.classId,
        mid: this.methodId,
        data: this.data
      }
      // console.log(req);
      // console.log(this.$refs[formName])
      this.$refs[formName].validate(valid => {
        if (valid) {
          logicApi.addLogic(req)
            .then((res) => {
              console.log("data", res);
              if (res.code === 200) {
                this.data = res.data
              } else {
                this.$message.error("新建失败", 0.5)
              }
              this.addVisible = false
            })
            .catch((err) => {
              console.log(err);
              this.$message.error('新建失败', 0.5)
              this.resetForm('ruleForm')
            })
          this.addVisible = false
        } else {
          this.$message.error("新建失败", 0.5)
          this.addVisible = false
        }
      })
    },

    // 编辑逻辑
    findRow(data, key) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].key === key) {
          this.setSentenceContent(this.logicForm.sentenceId[2])

          data[i] = this.logicForm
          return
        }
        if (data[i].children !== undefined) {
          if (data[i].children.length) {
            this.findRow(data[i].children, key)
          }
        }
      }
    },
    edit(record) {
      this.editVisible = true
      this.nowKey = record.key
      this.logicForm = Object.assign({}, record)
      console.log(this.logicForm)
      let id = this.logicForm.sentenceId[2]
      id = +id
      // console.log(typeof id);
      if (id <= 5) {
        this.calcContent = this.logicForm.sentenceContent
      }
      if (id > 5 && id <= 9) {
        console.log(11);
      }
      if (id > 9 && id <= 12) {
        if (id === 11) {
          this.loopCount = +this.logicForm.sentenceContent
        }
      }
      if (id > 12 && id <= 15) {
        console.log("跳跃并无语句内容");
      }
      if (id > 15 && id <= 19) {
        this.assignContent = this.logicForm.sentenceContent
      }
      // console.log(this.logicForm)
    },
    saveEdit(formName) {
      // console.log(this.data);
      this.findRow(this.data, this.nowKey)
      // console.log(this.logicForm)
      let req = {
        eid: +this.id,
        cid: this.classId,
        mid: this.methodId,
        data: this.data
      }
      // console.log(this.data);
      this.$refs[formName].validate(valid => {
        if (valid) {
          logicApi.updateLogic(req)
            .then((res) => {
              if (res.code === 200) {
                this.data = res.data
              } else {
                this.$message.error("修改失败", 0.5)
              }
              this.editVisible = false
            })
            .catch(() => {
              this.$message.error('修改失败', 0.5)
              this.resetForm('ruleForm')
            })
        } else {
          this.$message.error("修改失败", 0.5)
        }
      })
    },
    handleCancel() {
      this.addVisible = false
      this.editVisible = false
      this.resetForm('ruleForm')
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  created() {
    // console.log(this.$store.getters.desData)
  }
};
</script>
<style scoped>
.editable-dataForm-operations a {
  margin-right: 8px;
}
</style>