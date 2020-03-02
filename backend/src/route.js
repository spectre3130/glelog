const express = require('express');
const router = express.Router();
const authRouter = require('./auth/auth.route');
const userRoute = require('./user/user.route');
const postRoute = require('./post/post.route');
const postsRoute = require('./post/posts.route');
const tagRoute = require('./tag/tag.route');
const uploadRoute = require('./upload/upload.route');

router.use('/auth', authRouter);
router.use('/user', userRoute);
router.use('/post', postRoute);
router.use('/posts', postsRoute);
router.use('/tag', tagRoute);
router.use('/upload', uploadRoute);

module.exports = router;