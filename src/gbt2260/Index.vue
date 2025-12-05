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
                        <span :style="style.value.code">{{ '[' + (value.code2 ? value.code2 : '省') + ']' }}</span>
                    </td>
                    <td>
                        <span :style="style.value.text">{{ value.text2 ? value.text2 : '' }}</span>
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td>
                        <span :style="style.value.code">{{ '[' + (value.code4 ? value.code4 : '市') + ']' }}</span>
                    </td>
                    <td>
                        <span :style="style.value.text">{{ value.text4 ? value.text4 : '' }}</span>
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td>
                        <span :style="style.value.code">{{ '[' + (value.code6 ? value.code6 : '县') + ']' }}</span>
                    </td>
                    <td>
                        <span :style="style.value.text">{{ value.text6 ? value.text6 : '' }}</span>
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
            <table style="width: 100%;">
                <tbody>
                    <tr>
                        <td style="width: 30%"><div :style="style.popup.label">省</div></td>
                        <td>
                            <el-select
                                v-model="popup.select.code2"
                                filterable
                                :style="style.popup.select"
                                @change="hdlChangeCode2"
                            >
                                <el-option
                                    v-for="(item, index) in popup.select.arrCode2"
                                    :label="item.text2"
                                    :value="item.code2"
                                    :key="item.code2"
                                ></el-option>
                            </el-select>
                        </td>
                    </tr>
                    <tr>
                        <td><div :style="style.popup.label">市</div></td>
                        <td>
                            <el-select
                                v-model="popup.select.code4"
                                filterable
                                :style="style.popup.select"
                                @change="hdlChangeCode4"
                            >
                                <el-option
                                    v-for="(item, index) in popup.select.arrCode4"
                                    :label="item.text4"
                                    :value="item.code4"
                                    :key="item.code4"
                                ></el-option>
                            </el-select>
                        </td>
                    </tr>
                    <tr>
                        <td><div :style="style.popup.label">县</div></td>
                        <td>
                            <el-select
                                v-model="popup.select.code6"
                                filterable
                                :style="style.popup.select"
                            >
                                <el-option
                                    v-for="(item, index) in popup.select.arrCode6"
                                    :label="item.text6"
                                    :value="item.code6"
                                    :key="item.code6"
                                ></el-option>
                            </el-select>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div :style="style.line"></div>
            <div :style="style.popup.submit">
                <el-button type="danger" plain @click="hdlSubmit">确认</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<style lang="scss" scoped>
</style>

<script setup>
import {reactive, onMounted, watch} from "vue";
import ly0request from '../request/index.js'

const props = defineProps({
    myProps: {
        type: Object,
        default: () => ({ readOnly: false, value: '', _id: null }) // 提供清晰的默认值
    }
});
const emit = defineEmits(['get-value'])

const value = reactive({
    code2: '',
    text2: '',
    code4: '',
    text4: '',
    code6: '',
    text6: '',
});
const popup = reactive({
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

watch(() => props.myProps.value,
    async (valNew, valOld) => {
        // 只有当传入的值有效时才进行网络请求
        if (!valNew) return;
        
        const result2 = await ly0request.ly0.storpro({
            noSession: true,
            storproName: 'ly0d3.gbt2260code2.init',
        })
        popup.select.arrCode2 = result2.arrCode2.filter(item => item.code2)
        
        const result6 = await ly0request.ly0.storpro({
            noSession: true,
            storproName: 'ly0d3.gbt2260code6.get',
            data: { code6: valNew },
        })
        
        if(result6.itemCode6){
            // 保持响应式
            Object.assign(value, result6.itemCode6)
            
            // 确保按顺序加载级联数据
            if (value.code2) {
                await hdlChangeCode2(value.code2)
            }
            if (value.code4) {
                await hdlChangeCode4(value.code4)
            }
        }
    },
    { immediate: true }
);

const hdlPopup = async () => {
    if (!props.myProps.readOnly) {
        popup.select.code2 = value.code2
        await hdlChangeCode2(popup.select.code2)
        
        popup.select.code4 = value.code4
        await hdlChangeCode4(popup.select.code4)
        
        popup.select.code6 = value.code6
        popup.visible = true
    }
}

const hdlChangeCode2 = async value => { // 使用 async 标记
    const result = await ly0request.ly0.storpro({
        noSession: true,
        storproName: 'ly0d3.gbt2260code4.code2',
        data: {code2: value},
    })
    
    popup.select.arrCode4 = result.arrCode4.filter(item => item.code4)
    popup.select.code4 = ''
    popup.select.arrCode6 = []
    popup.select.code6 = ''
}

const hdlChangeCode4 = async value => {
    const result = await ly0request.ly0.storpro({
        noSession: true,
        storproName: 'ly0d3.gbt2260code6.code4',
        data: {code4: value},
    })
    
    popup.select.arrCode6 = result.arrCode6.filter(item => item.code6)
    popup.select.code6 = ''
}

const hdlSubmit = () => {
    // ... (安全查找逻辑) ...
    value.code2 = popup.select.code2
    const foundItem2 = popup.select.arrCode2.find(i => i.code2 === value.code2)
    value.text2 = foundItem2 ? foundItem2.text2 : ''
    value.code4 = popup.select.code4
    const foundItem4 = popup.select.arrCode4.find(i => i.code4 === value.code4)
    value.text4 = foundItem4 ? foundItem4.text4 : ''
    value.code6 = popup.select.code6
    const foundItem6 = popup.select.arrCode6.find(i => i.code6 === value.code6)
    value.text6 = foundItem6 ? foundItem6.text6 : ''
    emit("get-value", {
        code6: value.code6
            ? value.code6
            : value.code4
                ? value.code4
                : value.code2
                    ? value.code2
                    : '',
        _id: '_id' in props.myProps ? props.myProps._id : null,
    })
    popup.visible = false
}

const style = reactive({
    value: {
        code: {
            color: '#6a6a6a',
        },
        text: {
            color: '#0000bb',
            'padding-left': '10px',
        }
    },
    popup: {
        label: {
            'text-align': 'right',
            'font-size': 'medium',
            'padding-right': '20px'
        },
        select: {
            width: '300px',
            'margin-top': '10px',
            'margin-bottom': '10px',
            height: '40px',
            'line-height': '40px'
        },
        submit: {
            'text-align': 'right'
        }
    },
    line: {
        height: '1px',
        'background-color': '#999999',
        'margin-top': '10px',
        'margin-bottom': '10px'
    }
})
</script>
