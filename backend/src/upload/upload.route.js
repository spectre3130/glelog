const express = require('express');
const router = express.Router();
const upload = require('./upload');
const post = require('../post/post');
const jwtProvider = require('../auth/jwt.provider');
const s3 = require('../config/s3');

router.post('/avatar', jwtProvider.authenticate, s3.avatar.single('avatar'), upload.changeAvatar);
router.post('/postimage', jwtProvider.authenticate, s3.post.single('postImage'), upload.savePostImage);

module.exports = router;