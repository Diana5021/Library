import SMERouter from 'sme-router'
import appHomeController from '@controllers/books/app-home-controller'
import appItemController from '@controllers/books/app-book-items-controller'
import appPublishController from '@controllers/books/app-book-publish-controller'
import appDetialController from '@controllers/books/app-book-detial-controller'



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
    router.route('/book/detial',appDetialController.render)
    // router.route('/book/detial',appDetialController.render)



}

export default { init }