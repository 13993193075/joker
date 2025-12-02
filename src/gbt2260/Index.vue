<template>
    <div @click="hdlPopup">
        <table>
            <tbody>
                <tr>
                    <td>
                        <el-icon v-if="!myProps.readOnly" style="color: blue">
                            <edit />
                        </el-icon>
                    </td>
                    <td>
                        <span class="value-code">{{ '[' + (value.code2 ? value.code2 : '省') + ']' }}</span>
                    </td>
                    <td>
                        <span class="value-text">{{ value.text2 ? value.text2 : '' }}</span>
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td>
                        <span class="value-code">{{ '[' + (value.code4 ? value.code4 : '市') + ']' }}</span>
                    </td>
                    <td>
                        <span class="value-text">{{ value.text4 ? value.text4 : '' }}</span>
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td>
                        <span class="value-code">{{ '[' + (value.code6 ? value.code6 : '县') + ']' }}</span>
                    </td>
                    <td>
                        <span class="value-text">{{ value.text6 ? value.text6 : '' }}</span>
                    </td>
                </tr>
            </tbody>
        </table>
        <el-dialog
            v-model="popup.visible"
            :custom-class="'code-template-dialog'"
            :close-on-press-escape="true"
            append-to-body
            title="行政区划 - 级联"
            width="800px"
            :destroy-on-close="true"
        >
            <table>
                <tbody>
                    <tr>
                        <td style="width: 30%"><div class="select-label">省</div></td>
                        <td>
                            <el-select
                                v-model="popup.select.code2"
                                filterable
                                class="select"
                                @change="hdlChangeCode2"
                            >
                                <el-option
                                    v-for="(item, index) in popup.select.arrCode2"
                                    :label="item.text2"
                                    :value="item.code2"
                                    :key="index"
                                ></el-option>
                            </el-select>
                        </td>
                    </tr>
                    <tr class="select-row">
                        <td><div class="select-label">市</div></td>
                        <td>
                            <el-select
                                v-model="popup.select.code4"
                                filterable
                                class="select"
                                @change="hdlChangeCode4"
                            >
                                <el-option
                                    v-for="(item, index) in popup.select.arrCode4"
                                    :label="item.text4"
                                    :value="item.code4"
                                    :key="index"
                                ></el-option>
                            </el-select>
                        </td>
                    </tr>
                    <tr class="select-row">
                        <td><div class="select-label">县</div></td>
                        <td>
                            <el-select v-model="popup.select.code6" filterable class="select">
                                <el-option
                                    v-for="(item, index) in popup.select.arrCode6"
                                    :label="item.text6"
                                    :value="item.code6"
                                    :key="index"
                                ></el-option>
                            </el-select>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="line"></div>
            <div class="select-submit">
                <el-button type="danger" plain @click="hdlSubmit">确认</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<style lang="scss" scoped>
@use 'index';
</style>

<script setup>
import {ref, onMounted, watch} from "vue";
import ly0request from '../request/index.js'

const props = defineProps(["myProps"]);
const emit = defineEmits(['get-value'])

const value = ref(Object.assign({
    code2: '',
    text2: '',
    code4: '',
    text4: '',
    code6: '',
    text6: '',
}, {code6: props.myProps.value}));
const popup = ref({
    visible: false,
    select: {
        arrCode2: [],
        code2: '',
        arrCode4: [],
        code4: '',
        arrCode6: [],
        code6: '',
    }
})

onMounted(()=>{
    ly0request.ly0.storpro({
        noSession: true,
        storproName: 'ly0d3.gbt2260code2.init',
    }).then(result=>{
        popup.value.select.arrCode2 = result.arrCode2
    })
})

watch(() => props.myProps.value,
(valNew, valOld) => {
        ly0request.ly0.storpro({
            noSession: true,
            storproName: 'ly0d3.gbt2260code6.get',
            data: {
                code6: valNew,
            },
        }).then(result=>{
            if(result.itemCode6){
                value.value = result.itemCode6
            }
        })
    },
    {
        immediate: true // 关键：让它在组件初始化时立即运行
    }
);

const hdlPopup = () => {
    if (!props.myProps.readOnly) {
        popup.value.select.code2 = value.value.code2
        hdlChangeCode2(popup.value.select.code2).then(() => {
            popup.value.select.code4 = value.value.code4
            hdlChangeCode4(popup.value.select.code4).then(() => {
                popup.value.select.code6 = value.value.code6
                popup.value.visible = true
            })
        })
    }
}

const hdlChangeCode2 = value => {
    return new Promise((resolve, reject) => {
        ly0request.ly0.storpro({
            scopeThis: this,
            noSession: true,
            storproName: 'ly0d3.gbt2260code4.code2',
            data: {code2: value},
        }).then(result => {
            popup.value.select.arrCode4 = result.arrCode4
            popup.value.select.code4 = ''
            popup.value.select.arrCode6 = []
            popup.value.select.code6 = ''
            resolve()
        })
    })
}

const hdlChangeCode4 = value => {
    return new Promise((resolve, reject) => {
        ly0request.storpro({
            noSession: true,
            storproName: 'ly0d3.gbt2260code6.code4',
            data: {code4: value},
        }).then(result => {
            popup.value.select.arrCode6 = result.arrCode6
            popup.value.select.code6 = ''
            resolve()
        })
    })
}

const hdlSubmit = () => {
    value.value.code2 = popup.value.select.code2
    value.value.text2 = value.value.code2
        ? popup.value.select.arrCode2.find(i => {
            return i.code2 === value.value.code2
        }).text2
        : ''
    value.value.code4 = popup.value.select.code4
    value.value.text4 = value.value.code4
        ? popup.value.select.arrCode4.find(i => {
            return i.code4 === value.value.code4
        }).text4
        : ''
    value.value.code6 = popup.value.select.code6
    value.value.text6 = value.value.code6
        ? popup.value.select.arrCode6.find(i => {
            return i.code6 === value.value.code6
        }).text6
        : ''
    emit("get-value", {
        code6: value.value.code6
            ? value.value.code6
            : value.value.code4
                ? value.value.code4
                : value.value.code2
                    ? value.value.code2
                    : '',
        _id: '_id' in props.myProps ? props.myProps._id : null,
    })
    popup.value.visible = false
}
</script>
