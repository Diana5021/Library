var express = require('express');
var router = express.Router();
const bookController = require('../controllers/book')
const { response } = require('../middlewares')
/* GET users listing. */
//获取全部
router.get('/items',bookController.getBookItems,response)
//上传
router.post('/item',bookController.postBookItem,response)
//详情
router.get('/item/:id',bookController.getBookItem,response)
//删除
router.delete('/item',bookController.deleteBookItem,response)
//update
router.put('/item',bookController.updateBookItem,response)


module.exports = router;
