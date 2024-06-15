const express = require('express');
const router = express.Router();
const AdminAnalyticsController = require('../controllers/adminAnalyticsController');


router.get('/analytics/categories', AdminAnalyticsController.getCategories);
router.get('/analytics/category/:category', AdminAnalyticsController.getCategoryData);
router.get('/analytics/revenue/:category',AdminAnalyticsController.getCategoryRevenueData)

module.exports = router;