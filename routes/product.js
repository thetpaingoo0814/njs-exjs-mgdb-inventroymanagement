const express = require('express');
const router = express.Router();
const { verifyToken } = require('../utils/validators');
const Controller = require('../controllers/product');
const {saveMultipleFiles} = require('../utils/gallery');

router.post('/',verifyToken,saveMultipleFiles,Controller.add);

module.exports = router;