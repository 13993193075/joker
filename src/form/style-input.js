function box(item){
    let result = {'text-align': 'left'}
    if(item.inputBox && item.inputBox.style){
        if(!!item.inputBox.new){
            // 外部样式覆盖
            result = item.inputBox.style
        }else{
            // 叠加
            result = Object.assign(result, item.inputBox.style)
        }
    }
    return result
}

// inputType: "text"
function text(item, myProps){
    return {
        'white-space': 'pre-line', // 保留换行符
        'border-left': '#ababab solid 1px',
        'border-top': '#ababab solid 1px',
        'padding-left': '10px',
        width: item.inputWidth ? item.inputWidth : myProps.inputWidth
    }
}

// inputType: "text0"
function text0(item){
    return {
        'white-space': 'pre-line', // 保留换行符
        color: 'blue'
    }
}

// inputType: "input", "select", "date-picker"
function input(item, myProps){
    return {
        width: item.inputWidth ? item.inputWidth : myProps.inputWidth,
        height: '40px'
    }
}

// inputType: "input-number"
function input_number(item){
    return {
        facade: {
            size: item.size ? item.size : ""
        }
    }
}

// inputType: "switch"
function el_switch(item){
    return {
        facade: {
            active_color: item.activeColor ? item.activeColor : "#ee7405"
        }
    }
}

// inputType: "button-group"
function button_group(item, groupItem, buttonItem){
    let result = {
        group: {
            style: {'margin-right': '10px'}
        },
        button: {
            style: {},
            icon: "",
            facade: {
                type: "",
                size: "",
                plain: false,
                round: false,
                circle: false
            }
        }
    }
    if(buttonItem && buttonItem.style){
        result.button.style = Object.assign(result.button.style, buttonItem.style)
    }if(buttonItem && buttonItem.icon){
        result.button.icon = buttonItem.icon
    }
    if(buttonItem && buttonItem.type){
        result.button.facade.type = buttonItem.type
    }
    if(buttonItem && buttonItem.size){
        result.button.facade.size = buttonItem.size
    }
    if(buttonItem && buttonItem.plain){
        result.button.facade.plain = buttonItem.plain
    }
    if(buttonItem && buttonItem.round){
        result.button.facade.round = buttonItem.round
    }
    if(buttonItem && buttonItem.circle){
        result.button.facade.circle = buttonItem.circle
    }
    return result
}

// inputType: "image"
function image(item, myProps){
    return {
        width: item.imageWidth ? item.imageWidth : myProps.imageWidth,
        height: item.imageHeight ? item.imageHeight : myProps.imageHeight,
    }
}

// inputType: "images"
function images(item, myProps){
    return {
        itemBox: {
            display: 'inline-block',
            margin: '10px'
        },
        itemThumb: {
            width: item.imageWidth ? item.imageWidth : myProps.thumbWidth,
            height: item.imageHeight ? item.imageHeight : myProps.thumbHeight,
        }
    }
}

// inputType: "richtext"
function richtext(item, myProps){
    return {
        // 富文本编辑器宽度
        width: item.editorWidth ? item.editorWidth : myProps.richtextEditorWidth,
    }
}

// inputType: "video"
function video(item, myProps){
    return {
        width: item.videoWidth ? item.videoWidth : myProps.videoWidth,
        height: item.videoHeight ? item.videoHeight : myProps.videoHeight,
    }
}

// inputType: "download"
function download(){
    return {
        style: {
            'text-decoration': 'underline',
            color: '#0000ff'
        },
        none: {color: '#6a6a6a'} // 没有链接
    }
}

export default {
    box,
    text,
    text0,
    input,
    input_number,
    el_switch,
    button_group,
    image,
    images,
    richtext,
    video,
    download
}
