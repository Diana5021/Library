
import appBookDetial from '@views/router/app-book-detial.html'
import bookModel from '@models'
import angel from '@utils/angel'



const render = async (req, res, next) => {
    changeStyle()
    let itemId = req.params.id
    let data = await bookModel.getBookItem(itemId)
    res.render(
        template.compile(appBookDetial)({
            detail: data
        })
    )

    // 返回
    $('.back').click(function(){
        angel.emit('back')
    })
    $('#bookDelete').click( function() {
        PostbirdAlertBox.confirm({
            'title': '警告',
            'content': '确认删除' + data.name,
            'okBtn': 'YES',
            'cancelBtn': 'No',
            'contentColor': 'red',
            'onConfirm': async function() {
                await bookModel.deleteBookItem(itemId)
                angel.emit('back')
            },
            'onCancel': function() {
            }
        });
    })
    $('#bookRevise').click(function() {
        angel.emit('go', '/book/editor/'+itemId)
    })    
}




function changeStyle() {
    $('#detial').siblings().children('a').removeClass('active')
    $('#detial').children('a').addClass('active')
}

export default {
    render
}