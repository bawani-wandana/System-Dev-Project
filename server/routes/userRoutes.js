const express = require('express');
const { createAccount, login , verifyToken} = require('../controllers/userController');

const router = express.Router();

router.post('/createaccount', createAccount);
router.post('/login', login);

router.get('/protected', verifyToken, (req, res) => {
    res.json("This is a protected route");
});


module.exports = router;
