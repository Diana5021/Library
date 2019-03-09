const bookModel = require('../../models/book')
const moment = require('moment')

const getBookItems = async (req, res, next) => {

    try{
        let data = await bookModel.getBookItems(req.query)
        res.responseData = {
            items: data.items.map(formatItem),
            pages: data.pages
        }  
        next('success')
    } catch (e) {
        next('error')
    }
    
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


const getBookItem = async (req, res, next) => {
    let itemId = req.params.id
    try {
        let data = await bookModel.getBookItemById(itemId)
        res.responseData = formatItem(data[0])
        next('success')
    } catch (e) {
        // console.log(e)
        next('error')
    }
}


const deleteBookItem = async (req, res, next) => {
    let { id } = req.body
    try {
        await bookModel.deleteBookItem( id )
        next('success')
    } catch (e) {
        next('error')
    } 
}

const updateBookItem = async (req, res, next) =>{
    let data = req.body
    data.storageDate = moment(data.storageDate).valueOf()
    data.publishTime = moment(data.publishTime).valueOf()
    data.totalNum = ~~data.totalNum
    try {
        await bookModel.updateBookItem(data)
        next('success')
    } catch (e) {
        next('error')
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
    postBookItem,
    getBookItem,
    deleteBookItem,
    updateBookItem
}