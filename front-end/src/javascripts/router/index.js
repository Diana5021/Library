import SMERouter from 'sme-router'
import angel from '@utils/angel'
import appHomeController from '@controllers/books/app-home-controller'
import appItemController from '@controllers/books/app-book-items-controller'
import appPublishController from '@controllers/books/app-book-publish-controller'
import appDetialController from '@controllers/books/app-book-detial-controller'
import appEditorController from '@controllers/books/app-book-editor-controller' 


const init = () => {
    const router = new SMERouter('router-view')

    if ( !location.hash ) {
        location.href = '#/home'
    }
    //主页
    router.route('/home',appHomeController.render)
    //all
    router.route('/book/items',appItemController.render)
    //上传
    router.route('/book/publish',appPublishController.render)
    //详情
    router.route('/book/detial/:id', appDetialController.render)
    //编辑
    router.route('/book/editor/:id', appEditorController.render)

    angel.on('go', router.go.bind(router))
    angel.on('back', router.back.bind(router))

}

export default { init }