<template>
    <!-- input-box -->
    <div :style="style.box(item)">
        <!-- 只读 -->
        <div v-if="item.inputType === 'text'" :style="style.text(item, formProps)">
            {{ formData[item.fieldName] ? formData[item.fieldName] : '&nbsp;' }}
        </div>
        <div v-if="item.inputType === 'text0'" :style="style.text0(item)">
            {{ formData[item.fieldName] ? formData[item.fieldName] : '&nbsp;' }}
        </div>
        <div v-if="!item.inputType" :style="style.text(item, formProps)">
            {{ formData[item.fieldName] ? formData[item.fieldName] : '&nbsp;' }}
        </div>
        <div v-if="item.inputType === 'expression'" :style="style.text(item, formProps)">
            {{
                item.hdlExpression && item.hdlExpression({formData, scopeThis})
                ? item.hdlExpression({formData, scopeThis})
                : '&nbsp;'
            }}
        </div>
        <div v-if="item.inputType === 'expression0'" :style="style.text0(item)">
            {{
                item.hdlExpression && item.hdlExpression({formData, scopeThis})
                ? item.hdlExpression({formData, scopeThis})
                : '&nbsp;'
            }}
        </div>
        <div v-if="item.inputType === 'line'" :style="style.line"></div>
    
        <!-- 修改数据 -->
        <el-input
            v-if="item.inputType === 'input'"
            v-model="formData[item.fieldName]"
            :placeholder="input.placeholder"
            :style="style.input(item, formProps)"
            @input="input.hdlCannotInput"
            :show-password="input.showPassword"
        ></el-input>
        <el-select
            v-if="item.inputType === 'select'"
            class="deep-input"
            v-model="formData[item.fieldName]"
            :placeholder="select.placeholder"
            filterable
            :style="style.input(item, formProps)"
            @change="select.hdlChange"
        >
            <el-option
                v-for="(item0, index0) in select.items"
                :label="item0[item.item_fieldLabel]"
                :value="item0[item.item_fieldValue]"
                :key="index0"
            ></el-option>
        </el-select>
        <el-date-picker
            v-if="item.inputType === 'date-picker'"
            class="deep-input"
            v-model="formData[item.fieldName]"
            :type="item.type ? item.type : 'datetime'"
            :placeholder="datePicker.placeholder"
            :format="datePicker.format"
            :style="style.input(item, formProps)"
            @change="datePicker.hdlChange"
        ></el-date-picker>
        <el-input-number
            v-if="item.inputType === 'input-number'"
            v-model="formData[item.fieldName]"
            :size="style.input_number(item).facade.size"
            :min="'min' in item ? item.min : 1"
            :max="'max' in item ? item.max : 100"
            :step="'step' in item ? item.step : 1"
            :step-strictly="'step_strictly' in item ? item.step_strictly : true"
        ></el-input-number>
        <el-switch
            v-if="item.inputType === 'switch'"
            v-model="formData[item.fieldName]"
            :active-text="item.activeText"
            :inactive-text="item.inactiveText"
            :active-value="item.activeValue"
            :inactive-value="item.inactiveValue"
            :active-color="style.el_switch(item).facade.active_color"
            :disabled="!!('disabled' in item && (item.disabled === true || item.disabled === 'true'))"
            @change="ly0switch.hdlChange"
        ></el-switch>
        <el-radio-group
            v-if="item.inputType === 'radio-group'"
            v-model="formData[item.fieldName]"
            :disabled="!!item.disabled"
            @change="radioGroup.hdlChange"
        >
            <template v-for="(item0, index0) in item.items" :key="index0">
                <el-radio :label="item0[item.item_fieldValue]">
                    {{ item0[item.item_fieldLabel] }}
                </el-radio>
            </template>
        </el-radio-group>
        <div v-if="item.inputType === 'button-group' && item.box && item.box.length > 0">
            <template v-for="(item0, index0) in item.box" :key="index0">
                <el-button-group :style="style.button_group().group.style">
                    <template v-for="(item1, index1) in item0.box" :key="index1">
                        <el-tooltip
                            :disabled="!item1.tip"
                            :content="item1.tip && item1.tip.content ? item1.tip.content : ''"
                            :placement="item1.tip && item1.tip.placement ? item1.tip.placement : 'bottom'"
                            effect="light"
                        >
                            <el-button
                                :style="style.button_group(item, item0, item1).button.style"
                                :icon="style.button_group(item, item0, item1).button.icon"
                                :type="style.button_group(item, item0, item1).button.facade.type"
                                :size="style.button_group(item, item0, item1).button.facade.size"
                                :plain="style.button_group(item, item0, item1).button.facade.plain"
                                :round="style.button_group(item, item0, item1).button.facade.round"
                                :circle="style.button_group(item, item0, item1).button.facade.circle"
                                @click="item1.hdlClick ? item1.hdlClick({formData, scopeThis}) : null"
                                :key="index1"
                            >
                                <span v-if="item1.text">{{ item1.text }}</span>
                            </el-button>
                        </el-tooltip>
                    </template>
                </el-button-group>
            </template>
        </div>
    
        <!-- 图片&富文本&视频 -->
        <!-- 图片 -->
        <div v-if="item.inputType === 'image'">
            <div>
                <el-image
                    :style="style.image(item, formProps)"
                    :src="image.getSrc[0]"
                    :preview-src-list="image.getSrc"
                    :preview-teleported="true"
                    :hide-on-click-modal="true"
                ></el-image>
            </div>
            <!-- 设置了图片删除功能，同时图片不为空 -->
            <div v-if="!!item.imageDelete && !!formData[item.fieldName]">
                <el-button
                    size="small"
                    :icon="!formData[item.imageDelete] ? 'el-icon-delete' : 'el-icon-magic-stick'"
                    @click="image.delete"
                >{{ formData[item.imageDelete] ? '图片已删除，恢复' : '删除' }}</el-button>
            </div>
        </div>
        <!-- 多个图片 -->
        <div v-if="item.inputType === 'images'">
            <div
                v-for="(itemImages, indexImages) in formData[item.fieldName]"
                :key="indexImages"
                :style="style.images(item, formProps).itemBox"
            >
                <div>
                    <el-image
                        :style="style.images(item, formProps).itemThumb"
                        :src="images.getSrc(itemImages, indexImages)"
                        :preview-src-list="images.show"
                    ></el-image>
                </div>
                <div v-if="!!item.imageDelete">
                    <el-button
                        size="small"
                        icon="el-icon-delete"
                        @click="images.delete(itemImages, indexImages)"
                    >{{
                        formData[item.imageDelete].includes(itemImages) ? '恢复' : '删除'
                    }}</el-button>
                </div>
            </div>
        </div>
        <!-- 富文本 -->
        <div v-if="item.inputType === 'richtext'" :style="style.richtext(item, formProps)">
            <ly0Richtext v-model="formData[item.fieldName]" :myProps="richtextProps"></ly0Richtext>
        </div>
        <!-- 富文本show -->
        <div v-if="item.inputType === 'richtextShow'">
            <div v-html="formData[item.fieldName]"></div>
        </div>
        <!-- 视频 -->
        <div v-if="item.inputType === 'video'">
            <div>
                <video
                    :width="style.video(item, formProps).width"
                    :height="style.video(item, formProps).height"
                    controls
                    :poster="video.poster"
                >
                    <source :src="video.src" type="video/mp4" />
                    <!-- MP4/H.264/AAC - 最广泛支持 -->
                    <source :src="video.src" type="video/webm" />
                    <!-- WebM/VP9/Opus - 开源格式，支持良好 -->
                    <source :src="video.src" type="video/ogg" />
                    <!-- Ogg/Theora/Vorbis - 较旧的开源格式 -->
                </video>
            </div>
            <!-- 设置了视频删除功能，同时视频不为空 -->
            <div v-if="!!item.videoDelete && !!formData[item.fieldName]">
                <el-button
                    size="small"
                    :icon="!formData[item.videoDelete] ? 'el-icon-delete' : 'el-icon-magic-stick'"
                    @click="video.delete"
                >{{ !!formData[item.videoDelete] ? '视频已删除，恢复' : '删除' }}</el-button>
            </div>
        </div>
    
        <!-- 上传及下载 -->
        <!-- 下载 -->
        <div v-if="item.inputType === 'download'">
            <a
                v-if="formData[item.fieldName]"
                :style="style.download.style"
                :href="download.downloadSrc"
                :download="download.fileName"
            >
                <span>{{ download.downloadLabel }}</span>
            </a>
            <span v-else :style="style.download.none">{{ download.downloadLabel }}</span>
        </div>
        <!-- 上传多个文件 -->
        <div v-if="item.inputType === 'upload'">
            <ly0Upload
                v-model="formData[item.fieldName]"
                :myProps="{uploadUrl: upload.uploadUrl}"
            ></ly0Upload>
        </div>
        <!-- 拖拽上传 -->
        <div v-if="item.inputType === 'upload-drag'">
            <ly0Upload_drag
                v-model="formData[item.fieldName]"
                :myProps="{uploadUrl: upload.uploadUrl}"
            ></ly0Upload_drag>
        </div>
        <!-- 图片列表 -->
        <div v-if="item.inputType === 'upload-picture'">
            <ly0Upload_picture
                v-model="formData[item.fieldName]"
                :myProps="{uploadUrl: upload.uploadUrl_image}"
            ></ly0Upload_picture>
        </div>
        <!-- 图片墙 -->
        <div v-if="item.inputType === 'upload-picture-card'">
            <ly0Upload_pictureCard
                v-model="formData[item.fieldName]"
                :myProps="{uploadUrl: upload.uploadUrl_image}"
            ></ly0Upload_pictureCard>
        </div>
        <!-- 头像 -->
        <div v-if="item.inputType === 'upload-avatar'">
            <ly0Upload_avatar
                v-model="formData[item.fieldName]"
                :myProps="{uploadUrl: upload.uploadUrl_image}"
            ></ly0Upload_avatar>
        </div>
        <!-- 车牌识别 -->
        <div v-if="item.inputType === 'upload-carplate'">
            <ly0Upload_carplate
                v-model="formData[item.fieldName]"
                :myProps="{uploadUrl: upload.uploadUrl_carplate}"
            ></ly0Upload_carplate>
        </div>
    
        <!-- 行政区划 -->
        <div v-if="item.inputType === 'd3gbt2260'">
            <ly0gbt2260
                v-model="formData[item.fieldName]"
                :myProps="{readOnly: item.readOnly}"
            ></ly0gbt2260>
        </div>
    
        <!-- 商品分类 -->
        <div v-if="item.inputType === 'd7group'">
            <ly0d7group
                v-model="formData[item.fieldName]"
                :myProps="{readOnly: item.readOnly}"
            ></ly0d7group>
        </div>
        <!-- 邮寄地址 -->
        <div v-if="item.inputType === 'd7postal'">
            <ly0d7postal
                v-model="formData[item.fieldName]"
                :myProps="{readOnly: item.readOnly}"
            ></ly0d7postal>
        </div>
        <!-- 商品标价 -->
        <div v-if="item.inputType === 'd7price'">
            <ly0d7price
                v-model="formData[item.fieldName]"
                :myProps="{readOnly: item.readOnly}"
            ></ly0d7price>
        </div>
        <!-- 商品规格 -->
        <div v-if="item.inputType === 'd7size'">
            <ly0d7size
                v-model="formData[item.fieldName]"
                :myProps="{readOnly: item.readOnly}"
            ></ly0d7size>
        </div>
        <!-- 商品缩略图 -->
        <div v-if="item.inputType === 'd7thumb'">
            <ly0d7thumb
                v-model="formData"
                :myProps="{
                    thumb: {
                        fieldName: item.thumb.fieldName || formProps.para.ly0d7thumb.thumb.fieldName,
                        width: item.thumb.width || formProps.para.ly0d7thumb.thumb.width,
                        height: item.thumb.height || formProps.para.ly0d7thumb.thumb.height
                    },
                    name: {
                        fieldName: item.name.fieldName || formProps.para.ly0d7thumb.name.fieldName,
                    },
                    number: {
                        fieldName: item.number.fieldName || formProps.para.ly0d7thumb.number.fieldName,
                    },
                    readOnly: item.readOnly
                }"
            ></ly0d7thumb>
        </div>
    </div>
</template>

<script setup>
import {reactive, ref, computed, inject} from "vue";
import styleModule from './style.js'

const props = defineProps(["item"]);
// 表单数据及方法注入
const formData = inject("formData")
const formProps = inject("formProps")
const scopeThis = inject("scopeThis")

const input = reactive({
    placeholder: props.item.placeholder || formProps.para.placeholder.input,
    showPassword: !!props.item.showPassword,
    hdlCannotInput: event => { // 解决偶发不能输入的问题
        formData[props.item.fieldName] = event.target.value
    }
})

const select = reactive({
    placeholder: props.item.placeholder || formProps.para.placeholder.select,
    items: computed(()=>{
        if (props.item.items) {
            return props.item.items
        } else if (props.item.hdlGetItems) {
            return props.item.hdlGetItems({formData, scopeThis})
        }
    }),
    hdlChange: value => {
        if (props.item.hdlChange) {
            props.item.hdlChange({formData, scopeThis, value})
        }
    }
})

const datePicker = reactive({
    placeholder: computed(()=> {
        if (props.item.placeholder) {
            return props.item.placeholder
        }
        if (props.item.type === 'datetime') {
            return formProps.para.placeholder.datetime
        }
        if (props.item.type === 'date') {
            return formProps.para.placeholder.date
        }
        return formProps.para.placeholder.datetime
    }),
    format: computed(() => {
        if (props.item.format) {
            return props.item.format
        }
        if (props.item.type === 'datetime') {
            return 'YYYY/MM/DD HH:mm'
        }
        if (props.item.type === 'date') {
            return 'YYYY/MM/DD'
        }
        return 'YYYY/MM/DD HH:mm'
    }),
    hdlChange: value => {
        if (props.item.hdlChange) {
            props.item.hdlChange({formData, scopeThis, value})
        }
    }
})

const ly0switch = reactive({
    hdlChange: value => {
        if (props.item.hdlChange) {
            props.item.hdlChange({formData, scopeThis, value})
        }
    }
})

const radioGroup = reactive({
    hdlChange: value => {
        if (props.item.hdlChange) {
            props.item.hdlChange({formData, scopeThis, value})
        }
    }
})

const image = reactive({
    getSrc: computed(() => {
        if (
            props.item.imageDelete &&
            formData[props.item.imageDelete] &&
            (formData[props.item.imageDelete] === true ||
                formData[props.item.imageDelete] === 'true') // 图片已删除
        ) {
            return ['']
        }
        if (formData[props.item.fieldName]) {
            return formData[props.item.fieldName]
        }
        return ['']
    }),
    delete: ()=>{
        formData[props.item.imageDelete] =
            !formData[props.item.imageDelete]
    }
})

const images = reactive({
    getSrc: (itemImages, indexImages) => {
        if (
            !props.item.imageDelete ||
            !formData[props.item.imageDelete].includes(itemImages)
        ) {
            return itemImages
        }
        return ''
    },
    delete: (itemImages, indexImages) => {
        if (!formData[props.item.imageDelete].includes(itemImages)) {
            formData[props.item.imageDelete].push(itemImages)
            return
        }
        
        formData[props.item.imageDelete] = formData[props.item.imageDelete].filter(i => {
            return i !== itemImages
        })
    },
    show: computed(()=>{
        let result = []
        if (!props.item.imageDelete) {
            formData[props.item.fieldName].forEach(i => {
                result.push(i)
            })
        } else {
            formData[props.item.fieldName]
                .filter(i => {
                    return !formData[props.item.imageDelete].includes(i)
                })
                .forEach(i => {
                    result.push(i)
                })
        }
        return result
    })
})

const richtextProps = ref({
    uploadUrl: formProps.para.uploadUrl
})

const video = reactive({
    src: computed(()=>{
        if (
            props.item.videoDelete &&
            formData[props.item.videoDelete] &&
            (formData[props.item.videoDelete] === true ||
                formData[props.item.videoDelete] === 'true') // 图片已删除
        ) {
            return ''
        }
        if (formData[props.item.fieldName]) {
            return formData[props.item.fieldName]
        }
        return ''
    }),
    poster: computed(()=>{
        if (
            props.item.videoDelete &&
            formData[props.item.videoDelete] &&
            (formData[props.item.videoDelete] === true ||
                formData[props.item.videoDelete] === 'true') // 图片已删除
        ) {
            return ''
        }
        if (formData[props.item.poster]) {
            return formData[props.item.poster]
        }
        return ''
    }),
    delete: ()=>{
        formData[props.item.videoDelete] =
            !formData[props.item.videoDelete]
    },
})

const download = reactive({
    fileName: props.item.downloadFileName || formProps.para.download.fileName,
    downloadLabel: computed(() => {
        if (!formData[props.item.fieldName]) {
            return formProps.para.download.downloadLabelNoSrc
        }
        if (props.item.hdlGetDownloadLabel) {
            return props.item.hdlGetDownloadLabel({formData, scopeThis})
        }
        return formProps.para.download.downloadLabel
    }),
    downloadSrc: formData[props.item.fieldName] || ''
})

const upload = reactive({
    uploadUrl: formProps.para.uploadUrl,
    uploadUrl_image: formProps.para.uploadUrl_image,
    uploadUrl_carplate: formProps.para.uploadUrl_carplate
})

const style = reactive({
    box: styleModule.input.box,
    text: styleModule.input.text,
    text0: styleModule.input.text0,
    line: styleModule.line,
    input: styleModule.input.input,
    input_number: styleModule.input.input_number,
    el_switch: styleModule.input.el_switch,
    button_group: styleModule.input.button_group,
    image: styleModule.input.image,
    images: styleModule.input.images,
    richtext: styleModule.input.richtext,
    video: styleModule.input.video,
    download: computed(()=>styleModule.input.download()),
})
</script>

<style scoped lang="scss">
@use 'deep-input.scss';
</style>
