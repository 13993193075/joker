// 默认值

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
        inputWidth: '200px',
        imageWidth: '400px',
        imageHeight: '300px',
        thumbWidth: '40px',
        thumbHeight: '30px',
        videoWidth: '400px',
        videoHeight: '300px',
        placeholder: {
            input: '请输入',
            select: '请选择',
            datetime: '请选择时间',
            date: '请选择日期'
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
        cols: [
            {
                items: [
                    {
                        inputType: 'collapse',
                        accordion: false, // 手风琴模式
                        activeNames: '', // 当前活动的面板名称
                        items: [
                        ]
                    }
                ]
            }
        ]
    },
    dataBox: {
        fieldsValue: {},
        hdlSubmit(scopeThis, fieldsValue){}
    }
}