<template>
    <div>
        <table>
            <tbody>
                <tr>
                    <th></th>
                    <th>
                        <el-image
                            :style="style"
                            :src="value.thumb"
                            :preview-src-list="[value.thumb]"
                            :preview-teleported="true"
                            :hide-on-click-modal="true"
                        ></el-image>
                    </th>
                </tr>
                <tr @click="hdl.popup">
                    <th><i v-if="!myProps.readOnly" class="el-icon-edit" style="color: blue"></i></th>
                    <th>
                        <div>
                            <span v-if="!!value.number" class="value-number">{{ value.number }}</span>
                            <span v-else class="value-number-empty">[未设置商品编号]</span>
                        </div>
                        <div>
                            <span v-if="!!value.name" class="value-number">{{ value.name }}</span>
                            <span v-else class="value-number-empty">[未设置商品名称]</span>
                        </div>
                    </th>
                </tr>
            </tbody>
        </table>
        <el-dialog
            v-model="popup.visible"
            :custom-class="'code-template-dialog'"
            :close-on-press-escape="true"
            append-to-body
            title="商品编号、名称及缩略图"
            width="800px"
            :destroy-on-close="true"
        >
            <table style="width: 100%">
                <tbody>
                    <tr>
                        <th>
                            <el-collapse>
                                <el-collapse-item title="原图">
                                    <el-image
                                        :style="style"
                                        :src="value.thumb"
                                        :preview-src-list="[popup.value.thumb]"
                                    ></el-image>
                                </el-collapse-item>
                            </el-collapse>
                        </th>
                    </tr>
                    <tr>
                        <th>
                            <div style="margin-top: 10px; margin-bottom: 10px">上传新图</div>
                            <ly0Upload_avatar
                                :myProps="upload.props"
                                @getUploadResult="upload.getResult"
                            ></ly0Upload_avatar>
                        </th>
                    </tr>
                    <tr>
                        <th>
                            <div style="margin-top: 10px; margin-bottom: 10px">商品编号</div>
                            <div><el-input class="input-number" v-model="popup.value.number"></el-input></div>
                            <div style="margin-top: 10px; margin-bottom: 10px">商品名称</div>
                            <div>
                                <el-input
                                    class="input-number"
                                    v-model="popup.value.name"
                                    style="width: 400px"
                                ></el-input>
                            </div>
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
import {ref, computed} from "vue";

const props = defineProps(["myProps"]);
const emit = defineEmits(['get-value'])

const value = ref(props.myProps.value ? JSON.parse(JSON.stringify(props.myProps.value)) : {
    number: '',
    name: '',
    thumb: '',
});
const popup = ref({
    visible: false,
    value: JSON.parse(JSON.stringify(value.value))
})
const size = ref({
    width: '100px',
    height: '100px',
})
const style = computed(()=>()=>{
    return {
        width:
            props.myProps.thumb.size && props.myProps.thumb.size.width
                ? props.myProps.thumb.size.width
                : size.value.width,
        height:
            props.myProps.thumb.size && props.myProps.thumb.size.height
                ? props.myProps.thumb.size.height
                : size.value.height
    }
})

const upload = {
    props: computed(()=>()=>{
        return {
            uploadUrl: props.myProps.thumb.uploadUrl,
            avatar: {
                width:
                    props.myProps.thumb.size && props.myProps.thumb.size.width
                        ? props.myProps.thumb.size.width
                        : props.size.width,
                height:
                    props.myProps.thumb.size && props.myProps.thumb.size.height
                        ? props.myProps.thumb.size.height
                        : size.value.height,
            },
        }
    }),
    getResult(result) {
        // 可以获取多个文件上传结果
        popup.value.value.thumb = result.fileList.length === 0 ? '' : result.fileList[0].src
    },
}

const hdl = {
    popup() {
        if (!props.myProps.readOnly) {
            popup.value.value = JSON.parse(JSON.stringify(value.value))
            popup.value.visible = true
        }
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
