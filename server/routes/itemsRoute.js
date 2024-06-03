const express = require ('express');
const itemControlller = require('../controllers/itemController');
const router = express.Router();

router.post('/additem', itemControlller.addItem);

router.get('/getitems', itemControlller.getallItems);
router.put('/updateitem/:itemID', itemControlller.updateItem);
router.delete('/deleteitem/:itemID', itemControlller.deleteItem);


module.exports = router;