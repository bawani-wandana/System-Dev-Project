// routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.post('/cart', cartController.addToCart);
router.get("/cart/:userId", cartController.getCartItems);
router.get('/cart/itemCount/:id', cartController.getCartItemCount);
router.post('/cart/remove', cartController.removeFromCart);
router.post("/cart/updateQuantity", cartController.updateCartItemQuantity);
router.post('/cart/updateTotal', cartController.updateCartTotal);
// /cart/removeexpired'
// /cart/updatequantity
module.exports = router;
