// 默认值

import {ly0 as ly0resquest} from '../request/index.js'
export default {
    myProps: {
        popup: {
            visible: false,
            title: '',
            width: '800px',
            top: '15vh'
        },
        menu: {
            mode: 'horizontal',
            menu: []
        },
        cols: [],
        submit: {
            switch: false, // true - 提交模式, false - 组件模式
            watch: false, // 提交监听
            async handle({formData, scopeThis}){}, // 异步用户句柄
            url: '', // 后台提交 - URL地址
            storpro: '', // 后台提交 - 存储过程
        },
        para: {
            inputWidth: '200px',
            placeholder: {
                input: '请输入',
                select: '请选择',
                datetime: '请选择时间',
                date: '请选择日期'
            },
            image: {
                width: '400px',
                height: '300px',
            },
            thumb: {
                width: '40px',
                height: '30px',
            },
            video: {
                width: '300px',
                height: '200px',
            },
            upload: {
                uploadUrl: ly0resquest.domain + ly0resquest.upload,
                uploadUrl_image: ly0resquest.domain + ly0resquest.upload_image,
                uploadUrl_carplate: ly0resquest.domain + ly0resquest.upload_carplate,
            },
            richtext: {
                editorWidth: '500px', // 富文本编辑器宽度
                size: 200 // 可上传的图片大小，单位为KB, 1M = 1024KB
            },
            download: { // 行内下载
                fileName: 'new-file', // 下载文件名
                downloadLabel: '点击这里下载', // 下载标签
                downloadLabelNoSrc: '没有可供下载的资源', // 下载标签
            },
            ly0d7thumb: {
                thumb: {
                    fieldName: 'thumb',
                    width: '100px',
                    height: '100px',
                },
                name: {
                    fieldName: 'name',
                },
                number: {
                    fieldName: 'number',
                }
            }
        }
    }
}