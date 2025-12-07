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
        <compForm v-if="myProps_box" v-model="modelValue_box" :myProps="myProps_box" :scopeThis="scopeThis"></compForm>
    </el-dialog>
    <compForm v-else-if="myProps_box" v-model="modelValue_box" :myProps="myProps_box" :scopeThis="scopeThis"></compForm>
</template>

<style lang="scss" scoped></style>

<script setup>
import ly0default from './default.js'
import {reactive, watch} from "vue";
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

const myProps_box = reactive(Object.assign({}, ly0default.myProps, props.myProps))
const modelValue_box = reactive(
    myProps_box.submit.switch
    ? JSON.parse(JSON.stringify(props.modelValue))
    : props.modelValue
)

if(myProps_box.submit.switch){
    // 遵循 Vue 3 v-model 规范，使用 update:modelValue 事件
    const emit = defineEmits(['update:modelValue', 'change'])
    watch(myProps_box.submit.watch, (newVal, oldVal) => {
        if (newVal) {
            // 触发 update:modelValue 事件更新父组件的 v-model 绑定的值
            emit("update:modelValue", modelValue_box)
        }
    })
}
</script>
