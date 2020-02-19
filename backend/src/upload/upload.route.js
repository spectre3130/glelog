const express = require('express');
const router = express.Router();
const upload = require('./upload');
const auth = require('../auth/auth');
const s3 = require('../config/s3');

router.post('/avatar', auth.authenticate, s3.avatar.single('avatar'), upload.changeAvatar);
router.post('/postimage', auth.authenticate, s3.post.single('postImage'), upload.savePostImage);
router.post('/thumb', auth.authenticate, s3.thumb.single('thumb'), upload.saveThumb);

module.exports = router;