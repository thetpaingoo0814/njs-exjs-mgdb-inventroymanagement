const express = require('express');
const router = express.Router();
const Controller = require('../controllers/category');
const {verifyToken} = require('../utils/validators');
const {saveSingleFile} = require('../utils/gallery');

router.get('/',verifyToken, Controller.all);
router.post('/',verifyToken,saveSingleFile, Controller.add);

// router.get('/single/:id',verifyToken,Controller.getById);
// router.patch('/:id',verifyToken,Controller.modify);
// router.delete('/:id',verifyToken,Controller.drop);

router.route("/:id")
    .get(verifyToken,Controller.getById)
    .patch(verifyToken,Controller.modify)
    .delete(verifyToken,Controller.drop)

module.exports = router;