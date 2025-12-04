<template>
    <el-dialog
        v-if="myProps0.popup.visible"
        v-model="myProps0.popup.visible"
        custom-class="code-template-dialog"
        :close-on-press-escape="true"
        append-to-body
        :title="myProps0.popup.title"
        :width="myProps0.popup.width"
        :top="myProps0.popup.top"
        :destroy-on-close="true"
    >
        <compForm v-if="myProps0" :myProps="myProps0" :dataBox="dataBox"></compForm>
    </el-dialog>
    <compForm v-else-if="myProps0" :myProps="myProps0" :dataBox="dataBox"></compForm>
</template>

<style lang="scss" scoped></style>

<script setup>
import compForm from './Form.vue'
import ly0default from './default.js'
import {ref} from "vue";

const props = defineProps(["myProps", "dataBox"]);
const myProps0 = ref(Object.assign({}, ly0default.myProps, props.myProps))
</script>
