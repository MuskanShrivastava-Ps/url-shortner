const express = require('express');
const router = express.Router();
const { handleSignUpUser, handleLoginUser } = require('../controllers/url');

router.post('/login', handleLoginUser);
router.post('/', handleSignUpUser);


module.exports = router; 