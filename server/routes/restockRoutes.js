const express = require ('express');
const restockItemController = require('../controllers/restockItemController');
const router = express.Router();


router.put('/restock', restockItemController.restockItem);


module.exports = router;