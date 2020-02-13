const express = require('express');
const router = express.Router();
const post = require('./post');

router.get('/', post.getPosts);
router.get('/top/views', post.getTodayPosts);
router.get('/:username', post.getUserPosts);

module.exports = router;