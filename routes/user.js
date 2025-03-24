const express = require('express');
const router = express.Router();
const Controller = require('../controllers/user');
const {verifyToken} = require('../utils/validators');

router.post('/register', Controller.register);
router.post('/login',Controller.login);  
router.get('/me',verifyToken,Controller.getMe);

module.exports = router;