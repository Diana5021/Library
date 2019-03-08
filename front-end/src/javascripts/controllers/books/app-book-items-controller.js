import appBookItem from '@views/router/app-book-items.html'
import appBookItemContent from '@views/router/app-book-items-content.html'
import bookModel from '@models'



const render = async (req, res, next) => {
    changeStyle()
    res.render(template.compile(appBookItem)())
    await renderItems()

    //实例化分页器
    paginationHandler()
    
}

function changeStyle() {
    $('#item').siblings().children('a').removeClass('active')
    $('#item').children('a').addClass('active')
}

function paginationHandler () {
    $('#movie-items-pagination').createPage({
        pageNum: 10,
        current: 1,
        backfun: function(e) {
            //pageNo = e.current
            renderItems()
        }
    });
}

function renderItems() {
    return new Promise(async (resolve) => {
        let data = await bookModel.getBookItems()
        $('#movie-items-content').html(template.compile(appBookItemContent)({
            items: data
        }))
        resolve(data)
    })
}

export default {
    render
}