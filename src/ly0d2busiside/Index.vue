<template>
    <el-dialog
        v-if="myProps.popup.switch"
        v-model="myProps.popup.visible"
        :custom-class="'code-template-dialog'"
        :close-on-press-escape="true"
        append-to-body
        :title="myProps.popup.title"
        :width="myProps.popup.width"
        :top="myProps.popup.top"
        :destroy-on-close="true"
    >
        <compMain :myProps="myProps"></compMain>
    </el-dialog>
    <compMain v-else :myProps="myProps"></compMain>
</template>

<style lang="scss" scoped></style>

<script setup>
import compMain from './main.vue'
const props = defineProps({
    myProps: {
        type: Object,
        default: () => ({
            popup: {
                switch: false,
                visible: false,
                title: '支付记录',
                width: '1200px',
                top: '15vh'
            },
            readOnly: false,
            id_business: null,
            deal: 0
        })
    }
})
</script>
