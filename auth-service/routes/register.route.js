var express = require('express');
const router = express.Router();
const register = require('../controllers/register.controller');

router.post('/', register)

module.exports = router;