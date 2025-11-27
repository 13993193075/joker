<template><div>
        <el-upload
                :action="myProps0.uploadUrl"
                :file-list="fileList"
                list-type="picture-card"
                :before-upload="hdlBeforeUpload"
                :on-preview="hdlPreview"
                :on-remove="hdlRemove"
                :on-success="hdlSuccess"
                :limit="myProps0.limit"
        >
            <el-icon><Plus /></el-icon>
            <template #tip>
              <div class="el-upload__tip">&nbsp;{{myProps0.tip ? myProps0.tip : "可以上传" + myProps0.limit + "个图片"}}</div>
            </template>
        </el-upload>
        <el-dialog v-model="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
        <div v-if="fileList.length>0" style="font-size:xx-small">{{"已上传"+fileList.length+"个图片"}}</div>
        <el-button v-if="fileList.length>0" size="small" style="margin-top:10px;" @click="hdlDeleteAll">删除全部已上传图片</el-button>
</div></template>

<style lang="scss" scoped>
</style>

<script>
    import ly0default from "./default.js"
    export default {
        props: ['myProps'],
        data: function () {
            return {
                fileList: [],
                dialogImageUrl: '',
                dialogVisible: false
            }
        },
        computed: {
            myProps0(){
                return Object.assign(ly0default.myProps, this.myProps)
            }
        },
        methods: {
            hdlBeforeUpload (file) {
                let isFileType = !this.myProps0.type || file.type === this.myProps0.type
                let isFileSize = file.size / 1024 < this.myProps0.size

                if (!isFileType) {
                    this.$message.error('上传图片的格式只能是 ' + this.myProps0.type)
                    return false
                }
                if (!isFileSize) {
                    this.$message.error('上传图片的大小不能超过 ' + this.myProps0.size + ' KB')
                    return false
                }

                this.$message('正在上传 ...')
                return true
            },
            hdlPreview (file) { // 点击文件列表中已上传的文件时的钩子
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            hdlRemove (file, fileList) { // 文件列表移除文件时的钩子
                // 重置文件列表
                this.fileList = fileList

                // 返回上传结果
                let fileList0 = []
                fileList.forEach(i=>{
                    fileList0.push({
                        src: i.response.data.src
                    })
                })
                this.$emit('getUploadResult', {
                    fileList: fileList0
                })
            },
            hdlSuccess (response, file, fileList) { // 上传
                if (response.code === 0) {
                    // 重置文件列表
                    this.fileList = fileList

                    // 返回上传结果
                    let fileList0 = []
                    fileList.forEach(i=>{
                        fileList0.push({
                            src: i.response.data.src
                        })
                    })
                    this.$emit('getUploadResult', {
                        fileList: fileList0
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
            hdlDeleteAll () { // 删除全部已上传图片
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
