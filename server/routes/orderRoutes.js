const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.get('/ordersTable', orderController.getAllOrders);
router.put('/orders/:orderId/status', orderController.updateOrderStatus);

module.exports = router;
