<template>
    <div>
        <el-upload
                class="avatar"
                :style="hdlStyleAvatarBox()"
                :action="myProps0.uploadUrl"
                v-model:file-list="fileList"
                :show-file-list="false"
                :before-upload="hdlBeforeUpload"
                :on-preview="hdlPreview"
                :on-remove="hdlRemove"
                :on-success="hdlSuccess"
        >
            <img v-if="fileList.length>0 && fileList[0].response && fileList[0].response.data && fileList[0].response.data.src" :src="fileList[0].response.data.src" class="avatar" :style="hdlStyleAvatarImage()">
            <el-icon v-else class="avatar-uploader-icon" :style="hdlStyleAvatarIcon()"><Plus /></el-icon>
        </el-upload>
        <div v-if="fileList.length>0 && fileList[0].response && fileList[0].response.data && fileList[0].response.data.src">
            <el-button size="small" icon="el-icon-delete" style="margin-top:10px;" @click="hdlDeleteAll">删除</el-button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .avatar {
        border: 1px dashed #d9d9d9;
    }
    .avatar:hover {
        border-color: #409EFF;
    }
</style>

<script>
    import ly0default from "./default.js"
    export default {
        props: ['myProps'],
        data(){return{
            fileList: []
        }},
        computed: {
            myProps0(){
                return Object.assign({}, ly0default.myProps, {uploadUrl: ly0default.carplate.uploadUrl}, this.myProps)
            }
        },
        methods: {
            hdlStyleAvatarBox(){
                return "width:" + (this.myProps0.avatar ? this.myProps0.avatar.width : ly0default.carplate.width) + "; " +
                    "height:" + (this.myProps0.avatar ? this.myProps0.avatar.height : ly0default.carplate.height) + "; " +
                    "position: relative; " +
                    "overflow: hidden; " +
                    "cursor: pointer;"
            },
            hdlStyleAvatarImage(){
                return "display: block;" +
                    "width:" + (this.myProps0.avatar ? this.myProps0.avatar.width : ly0default.carplate.width) + "; " +
                    "height:" + (this.myProps0.avatar ? this.myProps0.avatar.height : ly0default.carplate.height) + ";"
            },
            hdlStyleAvatarIcon(){
                return "display: block; " +
                    "width:" + (this.myProps0.avatar ? this.myProps0.avatar.width : ly0default.carplate.width) + "; " +
                    "height:" + (this.myProps0.avatar ? this.myProps0.avatar.height : ly0default.carplate.height) + "; " +
                    "line-height:" + (this.myProps0.avatar ? this.myProps0.avatar.height : ly0default.carplate.height) + "; " +
                    "font-size: 28px; " +
                    "color: #8c939d; " +
                    "text-align: center;"
            },
            hdlBeforeUpload (file) {
                let isFileType = !this.myProps0.type || file.type === this.myProps0.type
                let isFileSize = file.size / 1024 < this.myProps0.size

                if (!isFileType) {
                    this.$message.error('上传文件的格式只能是 ' + this.myProps0.type)
                    return false
                }
                if (!isFileSize) {
                    this.$message.error('上传文件的大小不能超过 ' + this.myProps0.size + ' KB')
                    return false
                }

                this.$message('正在上传 ...')
                return true
            },
            // eslint-disable-next-line
            hdlPreview (file) { // 点击文件列表中已上传的文件时的钩子
            },
            // eslint-disable-next-line
            hdlRemove (file, fileList) { // 文件列表移除文件时的钩子
                // 重置文件列表
                // 因为只能上传1个图片，移除即清空
                this.fileList = []

                // 返回上传和检测结果
                this.$emit('getUploadResult', {
                    fileList: []
                })
            },
            // eslint-disable-next-line
            hdlSuccess (response, file, fileList) { // 上传
                if (response.code === 0) {
                    // 重置文件列表
                    // 因为只能上传1个图片，这里需要清空图片列表
                    this.fileList = []
                    this.fileList.push(file)

                    // 返回上传结果
                    this.$emit('getUploadResult', {
                        src: response.data.src,
                        result: response.data.result
                    })
                    this.$message({
                        type: 'info',
                        message: '上传成功'
                    })
                } else {
                    this.$message({
                        type: 'info',
                        message: '上传失败'
                    })
                }
            },
            hdlDeleteAll () { // 删除全部已上传文件
                // 重置文件列表
                this.fileList = []

                // 返回上传结果
                this.$emit('getUploadResult', {
                    fileList: []
                })
            }
        }
    }
</script>
