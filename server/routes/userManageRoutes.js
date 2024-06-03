const express = require('express');
const userManageController = require('../controllers/userManageController');
const router = express.Router();

router.get('/getusers', userManageController.getUsers);
router.put('/updateUserType',  userManageController.updateUserType);

module.exports = router;