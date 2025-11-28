import testFieldsValue from "./test-fields-value.js"
const dataBox = {
    fieldsValue: testFieldsValue.fieldsValue,
    hdlSubmit(scopeThis){
        console.log("提交：", scopeThis.testForm.dataBox.fieldsValue)
    },
    upload: "http://localhost:443/ly0/upload-req/file", // 文件上传地址
    upload_image: "http://localhost:443/ly0/upload-req/image", // 图片上传地址
    upload_carplate: "http://localhost:443/ly0/upload-req/carplate", // 车牌图片上传地址
}

const formProps = {
    /*
    popup: {
        visible: true,
        title: "form - 测试",
        width: "2048px",
        // top: "15vh"
    },
    */
    cols: [ // 表单区域可以分为多个列
        {
            items: [ // 每一列可以包含多个输入项目
                {
                    inputType: "text",
                    label: "姓名",
                    fieldName: "name",
                    labelStyle: "color: red;",
                    hdlLabelClick(scopeThis){
                        scopeThis.$message("我点击了字段[姓名]的标签")
                    },
                    inputWidth: "100px"
                },
                {
                    inputType: "text0",
                    label: "姓名",
                    fieldName: "name"
                },
                {
                    label: "姓名",
                    fieldName: "name"
                },
                {
                    inputType: "expression",
                    label: "我是谁",
                    hdlExpression(scopeThis){
                        return "我是 " + scopeThis.testForm.dataBox.fieldsValue.name
                    }
                },
                {
                    inputType: "expression0",
                    label: "我是谁",
                    hdlExpression(scopeThis){
                        return "我是 " + scopeThis.testForm.dataBox.fieldsValue.name
                    }
                },
                {
                    inputType: "line"
                },
                {
                    inputType: "input",
                    label: "姓名",
                    fieldName: "name"
                },
                {
                    inputType: "line"
                },
                {
                    inputType: "image",
                    label: "照片",
                    fieldName: "photo",
                    imageWidth: "120px",
                    imageHeight: "160px"
                },
                {
                    inputType: "richtext",
                    label: "备忘",
                    fieldName: "memo",
                    // containerWidth: "500px"
                },
                {
                    inputType: "richtextShow",
                    label: "备忘",
                    fieldName: "memo"
                },
                {
                    inputType: "download",
                    label: "下载照片",
                    fieldName: "photo",
                    downloadLabel: "点击这里下载",
                    downloadFileName: "new-file"
                }
            ]
        },
        {
            items: [
                {
                    inputType: "select",
                    label: "性别",
                    fieldName: "sex",
                    item_fieldLabel: "text",
                    item_fieldValue: "code",
                    items: [
                        {text: "未登记的性别", code: "0"},
                        {text: "男", code: "1"},
                        {text: "女", code: "2"},
                        {text: "其他", code: "9"}
                    ],
                    hdlChange(scopeThis, value){
                        scopeThis.$message("性别代码：" + value)
                    }
                },
                {
                    inputType: "date-picker",
                    label: "出生日期",
                    fieldName: "birth",
                    hdlChange(scopeThis, value){
                        scopeThis.$message("修改出生日期：" + value)
                    },
                    type: "date"
                },
                {
                    inputType: "switch",
                    label: "婚姻状况",
                    fieldName: "marital_status",
                    activeText: "已婚",
                    inactiveText: "未婚",
                    activeValue: "1",
                    inactiveValue: "0",
                    hdlChange(scopeThis, value){
                        scopeThis.$message("婚姻状况代码：" + value)
                    }
                },
                {
                    inputType: "radio-group",
                    label: "婚姻状况",
                    fieldName: "marital_status0",
                    disabled: false,
                    hdlChange(scopeThis, value){
                        scopeThis.$message("婚姻状况代码：" + value)
                    },
                    item_fieldLabel: "text",
                    item_fieldValue: "code",
                    items: [
                        {
                            text: "未婚",
                            code: "0"
                        },
                        {
                            text: "已婚",
                            code: "1"
                        },
                        {
                            text: "离异",
                            code: "2"
                        },
                        {
                            text: "丧偶",
                            code: "3"
                        },
                        {
                            text: "其他/未说明",
                            code: "9"
                        }
                    ]
                },
                {
                    inputType: "button-group",
                    box: [
                        {
                            box: [
                                {
                                    tip: {
                                        content: "性别：男",
                                        placement: "bottom"
                                    },
                                    text: "男",
                                    hdlClick(scopeThis){
                                        scopeThis.testForm.dataBox.fieldsValue.sex = "1"
                                        scopeThis.$message("性别已重置：1")
                                    }
                                },
                                {
                                    tip: {
                                        content: "性别：女",
                                        placement: "bottom"
                                    },
                                    text: "女",
                                    hdlClick(scopeThis){
                                        scopeThis.testForm.dataBox.fieldsValue.sex = "2"
                                        scopeThis.$message("性别已重置：2")
                                    }
                                },
                            ]
                        },
                        {
                            box: [
                                {
                                    tip: {
                                        content: "婚姻状况：未婚",
                                        placement: "bottom"
                                    },
                                    text: "未婚",
                                    hdlClick(scopeThis){
                                        scopeThis.testForm.dataBox.fieldsValue.marital_status0 = "0"
                                        scopeThis.$message("婚姻状况已重置：0")
                                    }
                                },
                                {
                                    tip: {
                                        content: "婚姻状况：已婚",
                                        placement: "bottom"
                                    },
                                    text: "已婚",
                                    hdlClick(scopeThis){
                                        scopeThis.testForm.dataBox.fieldsValue.marital_status0 = "1"
                                        scopeThis.$message("婚姻状况已重置：1")
                                    }
                                },
                                {
                                    tip: {
                                        content: "婚姻状况：离异",
                                        placement: "bottom"
                                    },
                                    text: "离异",
                                    hdlClick(scopeThis){
                                        scopeThis.testForm.dataBox.fieldsValue.marital_status0 = "2"
                                        scopeThis.$message("婚姻状况已重置：2")
                                    }
                                },
                                {
                                    tip: {
                                        content: "婚姻状况：丧偶",
                                        placement: "bottom"
                                    },
                                    text: "丧偶",
                                    hdlClick(scopeThis){
                                        scopeThis.testForm.dataBox.fieldsValue.marital_status0 = "3"
                                        scopeThis.$message("婚姻状况已重置：3")
                                    }
                                },
                                {
                                    tip: {
                                        content: "婚姻状况：其他/未说明",
                                        placement: "bottom"
                                    },
                                    text: "其他/未说明",
                                    hdlClick(scopeThis){
                                        scopeThis.testForm.dataBox.fieldsValue.marital_status0 = "9"
                                        scopeThis.$message("婚姻状况已重置：9")
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    inputType: "d3gbt2260",
                    label: "籍贯",
                    fieldName: "native",
                    readOnly: false
                },
                {
                    inputType: "collapse", // 输入项目类型：折叠面板
                    activeNames: ["my"], // 当前激活的面板(如果是手风琴模式，绑定值类型需要为string，否则为array)
                    accordion: true, // 是否手风琴模式
                    hdlVisible(scopeThis){ // 是否显示
                        return true
                    },
                    items: [
                        {
                            title: "我的",
                            name: "my",
                            hdlVisible(scopeThis){ // 是否显示
                                return true
                            },
                            items: [
                                {
                                    inputType: "input",
                                    label: "QQ号",
                                    fieldName: "qq"
                                },
                                {
                                    inputType: "input",
                                    label: "QQ密码",
                                    fieldName: "qq_password",
                                    showPassword: true
                                },
                                {
                                    inputType: "d7price",
                                    label: "我的费用标准",
                                    fieldName: "price"
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            items: [
                {
                    inputType: "upload",
                    label: "上传文件",
                    fieldName: "files",
                    limit: 3 // 允许上传的文件个数
                },
                {
                    inputType: "upload-drag",
                    label: "拖拽上传",
                    fieldName: "files",
                    limit: 3 // 允许上传的文件个数
                },
                {
                    inputType: "upload-picture",
                    label: "图片列表",
                    fieldName: "pictures",
                    limit: 3 // 允许上传的文件个数
                },
                {
                    inputType: "upload-picture-card",
                    label: "图片墙",
                    fieldName: "pictures",
                    limit: 3 // 允许上传的文件个数
                },
                {
                    inputType: "upload-avatar",
                    label: "头像",
                    fieldName: "avatar",
                },
                {
                    inputType: "upload-carplate",
                    label: "车牌识别",
                    fieldName: "carplate",
                }
            ]
        }
    ]
}

export default {
    dataBox,
    formProps
}
