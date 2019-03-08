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

//获取信息
// const getBookItems = async ({
//     // pageSize,
//     // pageNo,
//     search,
//     // sort,
//     // sortBy
// }) => {
//     let query = search ? {
//         title: new RegExp(search, 'g')
//     } : {}
//     let count = await getTotalPage(query)

//     let pages = {
//         totalNo: count,
//     }
//     return Items.find(query)
//             .then(res => {
//                 return {
//                     items: res,
//                     pages
//                 }
//             })
// }

const getBookItems = () => {
    return Items.find({})
}

//插入数据
const postBookItem = (params) => {
    return Items.insertMany(params)
}

module.exports = {
    getBookItems,
    postBookItem,
}