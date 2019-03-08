var express = require('express');
var router = express.Router();
const bookController = require('../controllers/book')
const { response } = require('../middlewares')
/* GET users listing. */
//获取全部
router.get('/items',bookController.getBookItems,response);
//上传
router.post('/item',bookController.postBookItem,response)

module.exports = router;
