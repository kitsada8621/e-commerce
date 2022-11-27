var express = require('express');
var router = express.Router();
var UserController = require('../controllers/user.controller');
var authorize = require('../middleware');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.json({ message: "user-service" })
});

router.get('/profile', authorize, UserController.Profile)
router.get('/order-history', authorize, UserController.OrderHistories);

module.exports = router;
