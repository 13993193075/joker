<template>
    <!-- label-box -->
    <div :style="style.box" @click="hdlClick">
        <span :style="style.label">
            {{item.label}}
        </span>
    </div>
</template>

<script setup>
import {ref, inject} from "vue";
import styleModule from './style.js'

const props = defineProps(["item"]);
// 表单数据及方法注入
const formData = inject("formData")
const formProps = inject("formProps")
const scopeThis = inject("scopeThis")

const style = ref({
    box: styleModule.label.box(props.item),
    label: styleModule.label.label(props.item),
})

const hdlClick = () => {
    if(props.item.hdlLabelClick){
        props.item.hdlLabelClick({formData, scopeThis});
    }
}
</script>

<style scoped lang="scss">

</style>