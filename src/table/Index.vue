<template>
    <el-dialog
        v-if="tableProps_box.popup.visible"
        v-model="tableProps_box.popup.visible"
        :custom-class="'code-template-dialog'"
        :close-on-press-escape="true"
        append-to-body
        :title="tableProps_box.popup.title"
        :width="tableProps_box.popup.width"
        :top="tableProps_box.popup.top"
        :destroy-on-close="true"
    >
        <compTable v-model="tableData_box" :myProps="tableProps_box" :scopeThis="scopeThis_box"></compTable>
    </el-dialog>
    <compTable v-else v-model="tableData_box" :myProps="tableProps_box" :scopeThis="scopeThis_box"></compTable>
</template>

<style lang="scss" scoped></style>

<script setup>
import {reactive} from "vue"
import compTable from './Table.vue'
import ly0default from './default.js'
import {unclassified as beanUnclass} from '@yoooloo42/bean'

const props = defineProps({
    modelValue: {
        type: Object,
        default: () => ({})
    },
    myProps: {
        type: Object,
        default: () => ({})
    },
    scopeThis: {
        type: Object,
        default: () => ({})
    }
})

// 顶层组件的props属性需做响应性包装，页面和js可以使用相同的命名
let tableData_box = reactive(beanUnclass.deepClone.deepMerge(props.modelValue, {
    data: props.modelValue.data ?? ly0default.modelValue.data,
    total: props.modelValue.total ?? ly0default.modelValue.total,
    sort: props.modelValue.sort ?? ly0default.modelValue.sort,
    pageSize: props.modelValue.pageSize ?? ly0default.modelValue.pageSize,
    currentPage: props.modelValue.currentPage ?? ly0default.modelValue.currentPage,
}))
const tableProps_box = reactive(beanUnclass.deepClone.deepMerge(
    beanUnclass.deepClone.deepClone(ly0default.myProps),
    props.myProps
))

const scopeThis_box = reactive(props.scopeThis)
</script>
