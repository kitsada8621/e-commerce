var express = require('express');
var router = express.Router();
const authorize = require('../middleware');


/* GET home page. */
router.get('/', function (req, res, next) {
  res.json({ message: "order-service" });
});

router.use('/order', authorize, require('./order.route'));

module.exports = router;
