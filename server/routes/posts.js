const express = require('express');
const router = express.Router();
const { index, update, create, destroy, like} = require('../controllers/PostController')
const {auth} = require('../middlewares/auth')
const {upload, uploadToGCS} = require('../middlewares/upload.js');

router.get('/', index);
router.post('/', auth, create)
router.put('/:id', auth, update)
router.put('/:id/like', auth, like)
router.delete('/:id', auth, destroy)

module.exports = router;
