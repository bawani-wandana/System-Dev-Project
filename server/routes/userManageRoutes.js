const express = require('express');
const userManageController = require('../controllers/userManageController');
const router = express.Router();

router.get('/getusers/:userId', userManageController.getUsers);
router.put('/updateUserType',  userManageController.updateUserType);
router.put('/updateuserprofile' , userManageController.updateUserProfile);
router.get('/getusersadmin', userManageController.getUsersAdmin)
router.get('/userOrders', userManageController.userOrders);

module.exports = router;