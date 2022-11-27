var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.json({message: "auth-service"});
});

router.use('/login', require('./login.route'));
router.use('/register', require('./register.route'));

module.exports = router;
