// routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.post('/addtocart', cartController.addToCart);
router.post('/updateitemquantity', cartController.updateItemQuantity);
router.post('/removefromcart', cartController.removeFromCart);
router.post('/removeexpired', cartController.removeExpiredItems);


module.exports = router;
