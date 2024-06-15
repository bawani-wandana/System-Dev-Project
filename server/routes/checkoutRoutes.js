const express = require('express');
const router = express.Router();
const checkoutController = require('../controllers/checkoutController');

router.get('/cartCheckout/:userId', checkoutController.getCart);
router.get('/getAddress/:userId', checkoutController.getAddress);
router.post('/createOrder', checkoutController.createOrder);
router.post('/createPayment', checkoutController.createPayment);
router.post('/createOrderDetails', checkoutController.createOrderDetails);
router.delete('/clearCart/:cartId', checkoutController.clearCart);

module.exports = router;