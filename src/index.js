import FileSaver from './FileSaver/index.js'
import request from './request/index.js'
import WeChat from './WeChat/index.js'
import withTable from './with-table/index.js'

import Form from './form/Index.vue'
import Menu from './menu/Index.vue'
import Richtext from './richtext/index.vue'
import Table from './table/Index.vue'
import upload from './upload/index.js'
import gbt2260 from './gbt2260/Index.vue'
import ly0d2cash from './ly0d2cash/Index.vue'
import ly0d2busiside from './ly0d2busiside/Index.vue'
import ly0d7group from './ly0d7group/Index.vue'
import ly0d7postal from './ly0d7postal/Index.vue'
import ly0d7price from './ly0d7price/Index.vue'
import ly0d7size from './ly0d7size/Index.vue'
import ly0d7thumb from './ly0d7thumb/Index.vue'

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
        app.component('ly0d2cash', ly0d2cash);
        app.component('ly0d2busiside', ly0d2busiside);
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