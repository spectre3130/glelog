const express = require('express');
const router = express.Router();
const post = require('./post');

router.get('/', post.getPosts);
// router.get('/:username', post.getUserPosts);
router.get('/:seq', post.getPost);
router.post('/', post.create);
router.put('/', post.update);
router.delete('/', post.delete);

module.exports = router;

