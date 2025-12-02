<template>
    <div @click="hdlPopup">
        <table>
            <tbody>
                <tr v-if="!value || value.length === 0">
                    <td><i v-if="!myProps.readOnly" class="el-icon-edit" style="color: blue"></i></td>
                    <td>[未分类]</td>
                </tr>
                <tr v-else>
                    <td><i v-if="!myProps.readOnly" class="el-icon-edit" style="color: blue"></i></td>
                    <td>
                        <template v-for="(item, index) in value">
                            <template v-if="!!item">
                                <div class="value-item">{{ item }}</div>
                            </template>
                        </template>
                    </td>
                </tr>
            </tbody>
        </table>
        <el-dialog
            v-model="popup.visible"
            :custom-class="'code-template-dialog'"
            :close-on-press-escape="true"
            append-to-body
            title="商品分类"
            width="800px"
            :destroy-on-close="true"
        >
            <table style="width: 100%">
                <tbody>
                    <tr>
                        <td>
                            <template v-for="(item, index) in popup.value" :key="index">
                                <div class="popup-value-item">
                                    <el-input class="input" v-model="popup.value[index]"></el-input>
                                    <el-button
                                        class="delete"
                                        type="danger"
                                        circle
                                        size="small"
                                        @click="hdl.delete(index)"
                                    >
                                        <el-icon><Delete></Delete></el-icon>
                                    </el-button>
                                </div>
                            </template>
                        </td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td style="width: 50px">
                            <el-button
                                type="primary"
                                circle
                                size="small"
                                style="margin-top: 20px"
                                @click="hdl.append"
                            >
                                <el-icon><Plus></Plus></el-icon>
                            </el-button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="line"></div>
            <div class="select-submit">
                <el-button type="danger" plain @click="hdl.submit">确认</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<style lang="scss" scoped>
@use 'index';
</style>

<script setup>
import {ref} from "vue";

const props = defineProps(["myProps"]);
const emit = defineEmits(['get-value'])

const value = ref(props.myProps.value ? JSON.parse(JSON.stringify(props.myProps.value)) : []);
const popup = ref({
    visible: false,
    value: JSON.parse(JSON.stringify(value.value))
})

const hdl = {
    // 弹出编辑窗口
    popup() {
        if (!props.myProps.readOnly) {
            popup.value.value = JSON.parse(JSON.stringify(value.value))
            popup.value.visible = true;
        }
    },
    append() {
        popup.value.value.push({ value: '' })
    },
    delete(index) {
        popup.value.value.splice(index, 1)
    },
    submit() {
        value.value = JSON.parse(JSON.stringify(popup.value.value))
        emit("get-value", {
            value: JSON.parse(JSON.stringify(popup.value.value)),
            _id: props.myProps._id ?? null
        })
        popup.value.visible = false
    },
}
</script>
