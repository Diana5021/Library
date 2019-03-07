import appHome from '@views/router/app-home.html'


const render = (req, res, next) => {
    res.render(appHome)
    console.log($('#home'))
    $('#home').siblings().children('a').removeClass('active')
    $('#home').children('a').addClass('active')
}

export default {
    render
}