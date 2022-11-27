const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/order.controller');
 
router.post('/', OrderController.Order);
router.get('/:id', OrderController.OrderDetails);
router.put('/:id', OrderController.CancelOrder);

module.exports = router;