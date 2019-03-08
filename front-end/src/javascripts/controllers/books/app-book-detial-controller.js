
import appBookDetial from '@views/router/app-book-detial.html'
import bookModel from '@models'



const render = (req, res, next) => {
    changeStyle()
    res.render(template.compile(appBookDetial)())
   

    
}

function changeStyle() {
    $('#detial').siblings().children('a').removeClass('active')
    $('#detial').children('a').addClass('active')
}

// function paginationHandler () {
//     $('#movie-items-pagination').createPage({
//         pageNum: 10,
//         current: 1,
//         backfun: function(e) {
//             //pageNo = e.current
//             renderItems()
//         }
//     });
// }

// function renderItems() {
//     return new Promise(async (resolve) => {
//         let data = await bookModel.getBookItems()
//         $('#movie-items-content').html(template.compile(appBookItemContent)({
//             items: data
//         }))
//         resolve(data)
//     })
// }

export default {
    render
}