const bookModel = require('../../models/book')
const moment = require('moment')

const getBookItems = async (req, res, next) => {
    
    let data = await bookModel.getBookItems()
    res.responseData = data.map(formatItem)   
    next('success')
}

const postBookItem = async (req, res, next) => {
    
    let { name, abstract, author, type, press, storageDate, publishTime, totalNum, cover } = req.body
    if ( name && abstract && author && type && press 
        && storageDate && publishTime && totalNum && cover ) {
        try {
            storageDate = moment(storageDate).valueOf()
            publishTime = moment(publishTime).valueOf()
            totalNum = ~~totalNum
            await bookModel.postBookItem({
                name, abstract, author, type, press, 
                storageDate, publishTime, totalNum, cover
            })
            next('success')
        } catch (e) {
            next('error')
        } 
    } else {
        next('miss param')
    }
}


function formatItem (item) {
    let publishTime = moment(item.publishTime).format('YYYY-MM-DD')
    let storageDate = moment(item.storageDate).format('YYYY-MM-DD')
    let abstract = item.abstract.replace(/<[^>]*>/g, '')
    return Object.assign({}, item._doc, {
        publishTime, storageDate, abstract
    })
}


module.exports = {
    getBookItems,
    postBookItem
}