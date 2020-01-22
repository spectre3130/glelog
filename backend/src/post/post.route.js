const express = require('express');
const router = express.Router();
const post = require('./post');
const jwtProvider = require('../auth/jwt.provider');

router.get('/', post.getPosts);
router.post('/', jwtProvider.authenticate, post.create);
router.put('/', jwtProvider.authenticate, post.update);
router.delete('/', jwtProvider.authenticate, post.delete);
// router.get('/:username', post.getUserPosts);
router.get('/:seq', post.getPost);

module.exports = router;

