import FileSaver from './FileSaver/index.js'
import Menu from './menu/index.vue'
import upload from './upload/index.js'

export {
    FileSaver,
    upload
}
export default {
    install(app, options) {
        // 全局注册组件
        app.component('ly0Menu', Menu);
        app.component('ly0Upload', upload.Upload);
        app.component('ly0Upload_avatar', upload.Upload_avatar);
        app.component('ly0Upload_carplate', upload.Upload_carplate);
        app.component('ly0Upload_drag', upload.Upload_drag);
        app.component('ly0Upload_picture', upload.Upload_picture);
        app.component('ly0Upload_pictureCard', upload.Upload_pictureCard);
    },

    FileSaver,
    upload
}