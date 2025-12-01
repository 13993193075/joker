import FileSaver from './FileSaver/index.js'
import ly0d7group from './ly0d7group/index.vue'
import ly0d7price from './ly0d7price/index.vue'
import ly0d7size from './ly0d7size/index.vue'
import Menu from './menu/index.vue'
import upload from './upload/index.js'

export {
    FileSaver
}
export default {
    install(app, options) {
        // 全局注册组件
        app.component('ly0Menu', Menu);
        app.component('ly0d7group', ly0d7group);
        app.component('ly0d7price', ly0d7price);
        app.component('ly0d7size', ly0d7size);
        app.component('ly0Upload', upload.Upload);
        app.component('ly0Upload_avatar', upload.Upload_avatar);
        app.component('ly0Upload_carplate', upload.Upload_carplate);
        app.component('ly0Upload_drag', upload.Upload_drag);
        app.component('ly0Upload_picture', upload.Upload_picture);
        app.component('ly0Upload_pictureCard', upload.Upload_pictureCard);
    },

    FileSaver
}