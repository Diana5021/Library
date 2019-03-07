import appHome from '@views/router/app-detial.html'


const render = (req, res, next) => {
    res.render(appHome)
    console.log($('#detial'))
    $('#detial').siblings().children('a').removeClass('active')
    $('#detial').children('a').addClass('active')
}

export default {
    render
}