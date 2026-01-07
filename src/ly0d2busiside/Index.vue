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
            id_business: null, // 订单id
            businesstype_code: '', // 订单类别
            deal: 0, // 订单金额（应收应付）
            wx_appid: '',
            wx_mchid: '',
            readOnly: false,
        })
    }
})
</script>
