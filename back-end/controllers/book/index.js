const bookModel = require('../../models/book')

const getBookItems = async (req, res, next) => {
   console.log('lll')
    let data = await bookModel.getBookItems()
    res.responseData  = data 
    next('success')
}



module.exports = {
    getBookItems
}