import appBookItem from '@views/router/app-book-items.html'
import appBookItemContent from '@views/router/app-book-items-content.html'
import bookModel from '@models'
import angel from '@utils/angel'

let pageSize = 10
let pageNo = 1
let pages = null
let search = ''

const render = async (req, res, next) => {
    changeStyle()
    res.render(template.compile(appBookItem)())
    await renderItems()

    //实例化分页器
    searchHandler()

    paginationHandler()


    $('#example2 tr').click(function(){
        let itemId = $(this).attr('href')
        angel.emit('go', '/book/detial/'+itemId)
    })
    
  
}

function changeStyle() {
    $('#item').siblings().children('a').removeClass('active')
    $('#item').children('a').addClass('active')
}

function searchHandler() {
    $('#search-btn').click(async function () {
        let val = $('#table-search').val()
        if ( val === search ) return false
        search = val
        pageNo = 1 
        await renderItems()
        paginationHandler()
    })
}

function paginationHandler () {
    $('#book-items-pagination').createPage({
        pageNum: pages.totalPage,
        current: pageNo,
        backfun: function(e) {
            pageNo = e.current
            renderItems()
        }
    });
}

function renderItems() {
    return new Promise(async (resolve) => {
        let data = await bookModel.getBookItems({
            pageSize,
            pageNo,
            search
        })
        pages = data.pages
        $('#book-items-content').html(template.compile(appBookItemContent)({
            items: data.items
        }))
        resolve(data)
    })
}




export default {
    render
}