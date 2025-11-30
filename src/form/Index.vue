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
        <compForm :scopeThis="scopeThis" :myProps="myProps0" :dataBox="dataBox"></compForm>
    </el-dialog>
    <compForm v-else :scopeThis="scopeThis" :myProps="myProps0" :dataBox="dataBox"></compForm>
</template>

<style lang="scss" scoped></style>

<script>
import compForm from './Form.vue'
import ly0default from './default.js'

export default {
    props: ['scopeThis', 'myProps', 'dataBox'],
    components: { compForm },
    computed: {
        myProps0() {
            return Object.assign({}, ly0default.myProps, this.myProps)
        }
    }
}
</script>
