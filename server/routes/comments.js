const express = require('express');
const router = express.Router();
const {create} = require('../controllers/CommentController')
const {auth} = require('../middlewares/auth')

router.post('/', auth, create)

module.exports = router;
