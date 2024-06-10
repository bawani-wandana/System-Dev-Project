const express = require('express');
const router = express.Router();
const orderDetailsController = require('../controllers/orderDetailsController');

router.get('/orders/:orderId/details', orderDetailsController.getOrderDetailsByOrderId);

module.exports = router;
