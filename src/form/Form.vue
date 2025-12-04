<template>
    <!-- 置顶菜单 -->
    <ly0Menu v-if="myProps.menu && myProps.menu.menu && myProps.menu.menu.length > 0" :myProps="myProps.menu"></ly0Menu>
    <!-- 表单区域可以分为多个列 -->
    <div :style="style.root_box">
        <div v-for="(item, index) in myProps.cols" :key="index">
            <table>
                <tbody>
                    <template v-for="(item0, index0) in item.items" :key="index0">
                        <tr v-if="item0.hdlVisible ? item0.hdlVisible(dataBox.fieldsValue) : true">
                            <td :style="style.field_box.left" v-if="!!item0.label">
                                <compLabelBox
                                    :myProps="myProps"
                                    :dataBox="dataBox"
                                    :item="item0"
                                ></compLabelBox>
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
                                            v-if="item1.hdlVisible ? item1.hdlVisible(dataBox.fieldsValue) : true"
                                            :title="item1.title"
                                            :name="item1.name ? item1.name : index1"
                                        >
                                            <table :style="style.collapse.table">
                                                <template v-for="(item2, index2) in item1.items" :key="index2">
                                                    <tr
                                                        v-if="
                                                            item2.hdlVisible
                                                            ? item2.hdlVisible(dataBox.fieldsValue)
                                                            : true
                                                        "
                                                    >
                                                        <td :style="style.field_box.left" v-if="item2.label">
                                                            <compLabelBox
                                                                :myProps="myProps"
                                                                :dataBox="dataBox"
                                                                :item="item2"
                                                            ></compLabelBox>
                                                        </td>
                                                        <td
                                                            :style="style.field_box.right"
                                                            :colspan="style.no_field_label(item2)"
                                                        >
                                                            <compInputBox
                                                                :myProps="myProps"
                                                                :dataBox="dataBox"
                                                                :item="item2"
                                                            ></compInputBox>
                                                        </td>
                                                    </tr>
                                                </template>
                                            </table>
                                        </el-collapse-item>
                                    </template>
                                </el-collapse>
                                <compInputBox
                                    v-else
                                    :myProps="myProps"
                                    :dataBox="dataBox"
                                    :item="item0"
                                ></compInputBox>
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>
      </div>
    </div>

    <!-- 提交 -->
    <template v-if="dataBox.hdlSubmit">
        <div :style="style.line"></div>
        <div :style="style.submit_box.style">
            <el-button
                :type="style.submit_box.button.facade.type"
                :plain="style.submit_box.button.facade.plain"
                :style="style.submit_box.button.style"
                @click="dataBox.hdlSubmit(dataBox.fieldsValue)"
            >提交</el-button>
        </div>
    </template>
</template>

<script setup>
import compLabelBox from './LabelBox.vue'
import compInputBox from './InputBox.vue'
import {computed, reactive} from "vue";
import styleModule from './style.js'

const props = defineProps(["myProps", "dataBox"]);

const style = reactive({
    collapse: computed(() => styleModule.collapse()),
    field_box: computed(() => styleModule.field_box()),
    line: computed(() => styleModule.line()),
    no_field_label: styleModule.no_field_label,
    root_box: computed(() => styleModule.root_box()),
    submit_box: computed(() => styleModule.submit_box())
})
</script>

<style lang="scss" scoped></style>
