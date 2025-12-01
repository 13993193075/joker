<template>
    <div @click="hdl.popup">
        <table>
            <tbody>
                <tr v-if="!value || value.length === 0">
                    <td><i v-if="!myProps.readOnly" class="el-icon-edit" style="color: blue"></i></td>
                    <td>[未设置更多邮寄地址]</td>
                </tr>
                <tr v-for="(item, index) in value" :key="index">
                    <td>
                        <i v-if="!myProps.readOnly && index === 0" class="el-icon-edit" style="color: blue"></i>
                    </td>
                    <td>
                        <table>
                            <tbody>
                                <tr>
                                    <td class="item-label">国内行政区划</td>
                                    <td class="item-value">{{ item.gbt2260text }}</td>
                                </tr>
                                <tr>
                                    <td class="item-label">详细地址</td>
                                    <td class="item-value">{{ item.address }}</td>
                                </tr>
                                <tr>
                                    <td class="item-label">联系电话</td>
                                    <td class="item-value">{{ item.tel }}</td>
                                </tr>
                                <tr>
                                    <td class="item-label">联系人</td>
                                    <td class="item-value">{{ item.name }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
        <el-dialog
            v-model="popup.visible"
            :custom-class="'code-template-dialog'"
            :close-on-press-escape="true"
            append-to-body
            title="邮寄地址"
            width="1200px"
            :destroy-on-close="true"
        >
        <table style="width: 100%">
            <tbody>
                <tr>
                    <th>国内行政区划</th>
                    <th>详细地址</th>
                    <th>联系电话</th>
                    <th>联系人</th>
                    <th></th>
                </tr>
                <tr v-for="(item, index) in popup.value" :key="index">
                    <!-- 左对齐，使用<td> -->
                    <td>
                        <ly0d3gbt2260
                            :myProps="{ value: item.gbt2260code, _id: index }"
                            @getValue="hdl.ly0d3gbt2260GetValue"
                        ></ly0d3gbt2260>
                    </td>
                    <!-- 居中对齐，使用<th> -->
                    <th>
                        <el-input class="input-address" v-model="item.address"></el-input>
                    </th>
                    <th>
                        <el-input class="input-tel" v-model="item.tel"></el-input>
                    </th>
                    <th>
                        <el-input class="input-name" v-model="item.name"></el-input>
                    </th>
                    <th>
                        <el-button
                            type="danger"
                            icon="el-icon-delete"
                            circle
                            size="small"
                            @click="hdl.delete(index)"
                        ></el-button>
                    </th>
                </tr>
                <tr>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th>
                        <el-button
                            type="primary"
                            icon="el-icon-plus"
                            circle
                            size="small"
                            style="margin-top: 20px"
                            @click="hdl.append"
                        ></el-button>
                    </th>
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
    ly0d3gbt2260GetValue(result) {
        popup.value.value[result._id].gbt2260code = result.code6
    },
    popup() {
        if (!props.myProps.readOnly) {
            popup.value.value = JSON.parse(JSON.stringify(value.value))
            popup.value.visible = true
        }
    },
    append() {
        popup.value.value.push({
            gbt2260code: '',
            address: '',
            tel: '',
            name: '',
        })
    },
    delete(index) {
        popup.value.value.splice(index, 1)
    },
    submit() {
        value.value = JSON.parse(JSON.stringify(popup.value.value))
        
        
        
        
        
        
        
        let arrPromise = []
        this.value.forEach((i) => {
            arrPromise.push(
                dataRequest.storpro({
                    noSession: true,
                    storproName: 'ly0d3.gbt2260code6.get',
                    data: { code6: i.gbt2260code },
                }),
            )
        })
        Promise.all(arrPromise).then((result) => {
            result.forEach((item, index) => {
                this.value[index].gbt2260text =
                    item.itemCode6.text2 + '-' + item.itemCode6.text4 + '-' + item.itemCode6.text6
            })
            this.$emit('getValue', {
                value: this.value,
                _id: !!this.myProps._id ? this.myProps._id : null,
            })
            this.popup.visible = false
        })
    },
    
}


import dataRequest from '../../../../utils/data-request.js'
</script>
