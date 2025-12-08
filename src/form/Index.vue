<template>
    <el-dialog
        v-if="myProps_box.popup && myProps_box.popup.visible"
        v-model="myProps_box.popup.visible"
        custom-class="code-template-dialog"
        :close-on-press-escape="true"
        append-to-body
        :title="myProps_box.popup.title"
        :width="myProps_box.popup.width"
        :top="myProps_box.popup.top"
        :destroy-on-close="true"
    >
        <compForm></compForm>
    </el-dialog>
    <compForm v-else></compForm>
</template>

<style lang="scss" scoped></style>

<script setup>
import ly0default from './default.js'
import {reactive, watch, provide} from "vue";
import compForm from './Form.vue'

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
// 遵循 Vue 3 v-model 规范，使用 update:modelValue 事件
const emit = defineEmits(['update:modelValue', 'change'])

const modelValue_box = reactive(JSON.parse(JSON.stringify(props.modelValue)))
const myProps_box = reactive(Object.assign({}, ly0default.myProps, props.myProps))
const scopeThis_box = reactive(Object.assign({}, props.scopeThis))

// 表单数据及方法提供
provide('formData', modelValue_box)
provide('formProps', myProps_box)
provide('scopeThis', scopeThis_box)

// 提交模式
if(myProps_box.submit.switch){
    watch(
        myProps_box.submit.watch,
        (newVal, oldVal) => {
        if (newVal) {
            // 触发 update:modelValue 事件更新父组件的 v-model 绑定的值
            emit("update:modelValue", modelValue_box)
        }
    })
}else{ // 非提交模式
    watch(
        modelValue_box, // 监听 reactive 对象时，默认是深层监听
        (newVal, oldVal) => {
            // 触发 update:modelValue 事件更新父组件的 v-model 绑定的值
            emit("update:modelValue", newVal)
        }
    )
}
</script>
