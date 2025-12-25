import FileSaver from './FileSaver/index.js'
import request from './request/index.js'
import WeChat from './WeChat/index.js'
import withTable from './with-table/index.js'

import Form from './form/index.vue'
import Menu from './menu/index.vue'
import Richtext from './richtext/index.vue'
import Table from './table/Index.vue'
import upload from './upload/index.js'
import gbt2260 from './gbt2260/index.vue'
import ly0d7group from './ly0d7group/index.vue'
import ly0d7postal from './ly0d7postal/index.vue'
import ly0d7price from './ly0d7price/index.vue'
import ly0d7size from './ly0d7size/index.vue'
import ly0d7thumb from './ly0d7thumb/index.vue'

export {
    FileSaver,
    request,
    WeChat,
    withTable
}
export default {
    install(app, options) {
        // 全局注册组件
        app.component('ly0Form', Form);
        app.component('ly0Menu', Menu);
        app.component('ly0Table', Table);
        app.component('ly0Richtext', Richtext);
        app.component('ly0Upload', upload.Upload);
        app.component('ly0Upload_avatar', upload.Upload_avatar);
        app.component('ly0Upload_carplate', upload.Upload_carplate);
        app.component('ly0Upload_drag', upload.Upload_drag);
        app.component('ly0Upload_picture', upload.Upload_picture);
        app.component('ly0Upload_pictureCard', upload.Upload_pictureCard);
        app.component('ly0gbt2260', gbt2260);
        app.component('ly0d7group', ly0d7group);
        app.component('ly0d7price', ly0d7price);
        app.component('ly0d7postal', ly0d7postal);
        app.component('ly0d7size', ly0d7size);
        app.component('ly0d7thumb', ly0d7thumb);
    },

    FileSaver,
    request,
    WeChat,
    withTable
}