<template>
    <!-- 置顶菜单 -->
    <ly0Menu v-if="formProps.menu && formProps.menu.menu && formProps.menu.menu.length > 0" :scopeThis="scopeThis" :formProps="formProps.menu"></ly0Menu>
    <!-- 表单区域可以分为多个列 -->
    <div :style="style.root_box">
        <div v-for="(item, index) in formProps.cols" :key="index">
            <table>
                <tbody>
                    <template v-for="(item0, index0) in item.items" :key="index0">
                        <tr v-if="item0.hdlVisible ? item0.hdlVisible({formData, scopeThis}) : true">
                            <td :style="style.field_box.left" v-if="!!item0.label">
                                <compLabelBox :item="item0"></compLabelBox>
                            </td>
                            <td :style="style.field_box.right" :colspan="style.no_field_label(item0)">
                                <el-collapse
                                    v-if="item0.inputType === 'collapse'"
                                    :accordion="
                                        'accordion' in item0 &&
                                        (item0.accordion === true || item0.accordion === 'true')
                                    "
                                    v-model="item0.activeNames"
                                    :style="style.collapse.style"
                                >
                                    <template v-for="(item1, index1) in item0.items" :key="index1">
                                        <el-collapse-item
                                            v-if="item1.hdlVisible ? item1.hdlVisible({formData, scopeThis}) : true"
                                            :title="item1.title"
                                            :name="item1.name ? item1.name : index1"
                                        >
                                            <table :style="style.collapse.table">
                                                <template v-for="(item2, index2) in item1.items" :key="index2">
                                                    <tr
                                                        v-if="
                                                            item2.hdlVisible
                                                            ? item2.hdlVisible({formData, scopeThis})
                                                            : true
                                                        "
                                                    >
                                                        <td :style="style.field_box.left" v-if="item2.label">
                                                            <compLabelBox :item="item2"></compLabelBox>
                                                        </td>
                                                        <td
                                                            :style="style.field_box.right"
                                                            :colspan="style.no_field_label(item2)"
                                                        >
                                                            <compInputBox :item="item2"></compInputBox>
                                                        </td>
                                                    </tr>
                                                </template>
                                            </table>
                                        </el-collapse-item>
                                    </template>
                                </el-collapse>
                                <compInputBox :item="item0"></compInputBox>
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>
      </div>
    </div>

    <!-- 提交 -->
    <template v-if="formProps.submit.switch">
        <div :style="style.line"></div>
        <div :style="style.submit_box.style">
            <el-button
                :type="style.submit_box.button.facade.type"
                :plain="style.submit_box.button.facade.plain"
                :style="style.submit_box.button.style"
                @click="hdl.submit"
            >提交</el-button>
        </div>
    </template>
</template>

<script setup>
import {reactive, inject} from "vue";
import compLabelBox from './LabelBox.vue'
import compInputBox from './InputBox.vue'
import styleModule from './style.js'
import ly0request from '../request/index.js'

// 表单数据及方法注入
const formData = inject("formData")
const formProps = inject("formProps")
const scopeThis = inject("scopeThis")

const style = reactive({
    collapse: styleModule.collapse,
    field_box: styleModule.field_box,
    line: styleModule.line,
    no_field_label: styleModule.no_field_label,
    root_box: styleModule.root_box,
    submit_box: styleModule.submit_box
})

const hdl = {
    async submit(){
        if(formProps.submit.handle){
            // 执行用户句柄
            const result = await formProps.submit.handle({
                formData,
                scopeThis
            })
            if(result.code !== 0){
                return
            }
        }
        
        // 后台提交 - URL地址
        if(formProps.submit.url){
            const result = await ly0request.ly0.ly0request({
                url: formProps.submit.url,
                data: formData
            })
            if(result.code !== 0){
                return
            }
        }
        
        // 后台提交 - 存储过程
        if(formProps.submit.storpro){
            const result = await ly0request.ly0.storpro({
                storproName: formProps.submit.storpro,
                data: formData
            })
            if(result.code !== 0){
                return
            }
        }
        
        // 提交监听
        formProps.submit.watch = true
        if(formProps.popup){
            // 关闭表单窗口
            formProps.popup.visible = false
        }
    }
}
</script>

<style lang="scss" scoped></style>
