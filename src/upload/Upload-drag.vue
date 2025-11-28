<template>
    <div>
        <el-upload
                :action="myProps0.uploadUrl"
                v-model:file-list="fileList"
                list-type="text"
                :before-upload="hdlBeforeUpload"
                :on-preview="hdlPreview"
                :on-remove="hdlRemove"
                :on-success="hdlSuccess"
                :limit="myProps0.limit"
                drag
        >
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <template #tip>
              <div class="el-upload__tip">&nbsp;{{myProps0.tip ? myProps0.tip : "可以上传" + myProps0.limit + "个文件"}}</div>
            </template>
        </el-upload>
        <div v-if="fileList.length>0" style="font-size:xx-small">{{"已上传"+fileList.length+"个文件"}}</div>
        <el-button v-if="fileList.length>0" size="small" style="margin-top:10px;" @click="hdlDeleteAll">删除全部已上传文件</el-button>
    </div>
</template>

<style lang="scss" scoped>
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
                return Object.assign({}, ly0default.myProps, this.myProps)
            }
        },
        methods: {
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
