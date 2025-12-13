<template><div>
    <el-dialog
            v-model="tableProps_box.table.pickCol.popup.visible"
            :custom-class="'code-template-dialog'"
            :close-on-press-escape="true"
            append-to-body
            title="选择列"
            width="400px"
    >
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkedAll" @change="hdl.checkedAll">全选</el-checkbox>
        <el-row style="height:1px; background-color:#bdbdbd; margin-top:10px; margin-bottom:10px;"></el-row>
        <el-checkbox-group v-model="itemsChecked" @change="hdl.checkedItemsChange">
            <el-checkbox style="display:block; margin-bottom:10px" v-for="item in tableProps_box.table.pickCol.colsInit"
                         :label="item ? item.key : ''" :key="item ? item.key : ''">{{item ? item.label : ''}}
            </el-checkbox>
        </el-checkbox-group>

        <el-row style="height:1px; background-color:#bdbdbd; margin-top:10px; margin-bottom:10px;"></el-row>
        <el-row style="text-align: center">
            <el-button type="success" round @click="hdl.confirm">确认</el-button>
        </el-row>
    </el-dialog>
</div></template>

<style lang="scss" scoped>
</style>

<script setup>
import { reactive, ref, watch } from 'vue'

const props = defineProps({
    tableProps: {
        type: Object,
        default: () => ({})
    }
})
// props属性包装，继承了顶层组件的响应性，页面和js可以使用相同的命名
const tableProps_box = props.tableProps

let checkedAll = ref(true) // 是否全选状态
let isIndeterminate = ref(false) // 不确定状态：非全选、非全空
let itemsChecked = reactive([]) // 已选中条目

const hdl = {
    // 获取键值数组
    getKeys(p) {
        let a = []
        p.forEach(i => {
            a.push(i.key)
        })
        return a
    },
    // 全选
    checkedAll(val) {
        itemsChecked = val ? hdl.getKeys(tableProps_box.table.pickCol.colsInit) : []
        isIndeterminate.value = false
    },
    // 选中或取消某一条
    checkedItemsChange(val) {
        checkedAll.value = val.length === tableProps_box.table.pickCol.colsInit.length
        isIndeterminate.value = val.length > 0 && val.length < tableProps_box.table.pickCol.colsInit.length
    },
    confirm() { // 确认提交
        tableProps_box.table.cols = []
        itemsChecked.forEach(i => {
            tableProps_box.table.cols.push(tableProps_box.table.pickCol.colsInit.find(j => {
                return j.key === i
            }))
        })
        tableProps_box.table.pickCol.popup.visible = false
    }
}

// 窗口弹出监听
watch(
    ref(tableProps_box.table.pickCol.popup.visible),
    (newVal, oldVal) => {
        if (newVal) {
            checkedAll.value = tableProps_box.table.cols.length === tableProps_box.table.pickCol.colsInit.length
            isIndeterminate.value = tableProps_box.table.cols.length !== tableProps_box.table.pickCol.colsInit.length
            itemsChecked = hdl.getKeys(tableProps_box.table.cols);
        }
    }
)
</script>
