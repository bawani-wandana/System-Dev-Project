const express = require('express');
const {
  addAddress,
  updateAddress,
  getAddressesByUserId,
  deleteAddressById,
} = require('../controllers/addressController');
const router = express.Router();

router.post('/addaddress', addAddress);
router.put('/updateaddress/:userId', updateAddress);
router.get('/getaddress/:userId', getAddressesByUserId);


module.exports = router;
