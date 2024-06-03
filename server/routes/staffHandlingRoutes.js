const express = require('express');
const staffHandlingController = require('../controllers/staffHandlingController');
const router = express.Router();


router.get('/staffUsers', staffHandlingController.getStaffUsers);
router.delete('/deleteUser/:userID', staffHandlingController.deleteStaff);

module.exports = router;