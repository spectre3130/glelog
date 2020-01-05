const express = require('express');
const router = express.Router();
const user = require('./user/user.route');
const post = require('./post/post.route');

router.use('/user', user);
router.use('/post', post);

module.exports = router;