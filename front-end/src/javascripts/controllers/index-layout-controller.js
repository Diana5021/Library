import angel from '@utils/angel'
import { getUserInfo } from '@models/users'
import appNav from '@views/layout/app-nav.html'
import appAside from '@views/layout/app-aside.html'
import appContent from '@views/layout/app-content.html'



const render = async () => {
    let $wrapper = $('.wrapper')
    $wrapper.append(appNav)
    $wrapper.append(appAside)
    $wrapper.append(appContent)


    let data =  await getUserInfo()
    $('#aside').html(template.compile(appAside)({
        info: data
    }))

}


export default {
    render
}