const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/Library',{ useNewUrlParser: true });

let bookItemSchema = new mongoose.Schema({
    cover: String,
    name: String,
    author: String,
    type: String,
    abstract: String,
    press: String,
    storageDate: Number,
    publishTime: Number,
    totalNum: Number
});

let Items = mongoose.model('book',bookItemSchema);

const getTotalPage = (query) => {
    return Items.find(query).countDocuments()
}

const getBookItems = async ({
    pageSize,
    pageNo,
    search
}) => {
    
    let query = search ? {
        name: new RegExp(search, 'g')
    } : {}
    let count = await getTotalPage(query)

    let pages = {
        totalNo: count,
        totalPage: Math.ceil(count / pageSize)
    }
    return Items.find(query)
                .limit(~~pageSize)
                .skip((pageNo - 1) * pageSize)
            .then(res => {
                return {
                    items: res,
                    pages
                }
            })
   
}

//插入数据
const postBookItem = (params) => {
    return Items.insertMany(params)
}
//获取某个
const getBookItemById = (id) => {
    return Items.find({_id: id})
}
//删除某个
const deleteBookItem = (id) => {
    return Items.deleteOne({_id: id})
}
//更新某个
const updateBookItem = (data) =>{
    let itemId = data.id
    delete data.id
    if ( !data.cover ){
        delete data.cover
    }
    return Items.updateOne({_id: itemId},data)
}



module.exports = {
    getBookItems,
    postBookItem,
    getBookItemById,
    deleteBookItem,
    updateBookItem
}