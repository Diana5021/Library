var express = require('express');
var router = express.Router();
const bookController = require('../controllers/book')
const { response } = require('../middlewares')
/* GET users listing. */

router.get('/items',bookController.getBookItems,response);

module.exports = router;
