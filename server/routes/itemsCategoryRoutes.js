const express = require('express');
const itemsCategoryController = require('../controllers/itemsCategoryController');
const router = express.Router();

router.get('/category/:category', itemsCategoryController.getItemsByCategory);

module.exports = router;
