var express = require('express');
var router = express.Router();
const { index } = require('./controller');
const { isLoginAdmin } = require('../middleware/auth');

/* GET home page. */
router.get('/', isLoginAdmin, index);

module.exports = router;
