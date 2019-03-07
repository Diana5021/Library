import appNav from '@views/layout/app-nav.html'
import appAside from '@views/layout/app-aside.html'
import appContent from '@views/layout/app-content.html'



const render = () => {
    let $wrapper = $('.wrapper')
    $wrapper.append(appNav)
    $wrapper.append(appAside)
    $wrapper.append(appContent)

}


export default {
    render
}