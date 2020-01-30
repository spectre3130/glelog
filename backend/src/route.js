const express = require('express');
const router = express.Router();
const user = require('./user/user.route');
const post = require('./post/post.route');
const posts = require('./post/posts.route');

router.use('/user', user);
router.use('/post', post);
router.use('/posts', posts);

module.exports = router;