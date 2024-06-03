const express = require ('express');
const itemsCustomerController = require ('../controllers/itemsCustomerController');
const router = express.Router();

router.get('/getitems', itemsCustomerController.getItems);
router.get('/getitems/:itemID', itemsCustomerController.getItem);

module.exports = router;