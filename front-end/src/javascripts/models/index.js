import request from '@utils/request'

//获取书籍信息

const getBookItems = () => {
    return request({
        url: '/api/v1/book/items',
        
    })
}

//上传书籍信息
const postBookItem = (data) => {
    return request({
        url: '/api/v1/book/item',
        type: 'post',
        data,
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        }
    })
}


//获取某个书籍信息
const getBookItem = (id) => {
    return request({
        url: '/api/v1/book/item/' + id
    })
}

//删除信息
const deleteBookItem = (data) => {
    return request({
        url: 'api/v1/book/item',
        type: 'delete',
        data: { id }
    })
}

//更新
const updateBookItem = (data) => {
    return request({
        url: '/api/v1/book/item',
        type: 'put',
        data,
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        }
    })
}

export default {
    getBookItems,
    postBookItem,
    getBookItem,
    updateBookItem,
    deleteBookItem
}