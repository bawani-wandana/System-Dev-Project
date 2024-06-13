const express = require('express');
const itemsCustomerController = require('../controllers/itemsCustomerController');
const router = express.Router();

router.get('/getItemCard', itemsCustomerController.getItems);
router.get('/getitems/:itemID', itemsCustomerController.getItem);
router.get('/searchItems', itemsCustomerController.searchItems);


module.exports = router;
