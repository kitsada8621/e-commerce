var express = require('express');
var router = express.Router();
var middleware = require('../middleware');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({message: "product-service"});
});

router.use('/product',middleware, require('./product.route'));

module.exports = router;
