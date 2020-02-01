const express = require('express');
const router = express.Router();
const user = require('./user/user.route');
const post = require('./post/post.route');
const posts = require('./post/posts.route');
const tag = require('./tag/tag.route');

router.use('/user', user);
router.use('/post', post);
router.use('/posts', posts);
router.use('/tag', tag);

module.exports = router;