import SMERouter from 'sme-router'
import appHomeController from '@controllers/books/app-home-controller'
import appDetialController from '@controllers/books/app-detial-controller'




const init = () => {
    const router = new SMERouter('router-view')

    if ( !location.hash ) {
        location.href = '#/home'
    }

    router.route('/home',appHomeController.render)
    router.route('/detial',appDetialController.render)



}

export default { init }