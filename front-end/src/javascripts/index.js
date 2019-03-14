import '@styles/index.scss'
import router from '@router'
import indexController from '@controllers/index-layout-controller.js'
import { userLoginAuthAction } from '@modules/auth'

userLoginAuthAction()
        .then(res => { // 登录成功
            indexController.render()
            router.init()
        }).catch(err => {
            console.log('catch', err)
            $.Toast('Warning', '请登陆后进入', 'warning')
            setTimeout(() => {
                window.location.href = '/login.html'
            }, 1000)
        })

