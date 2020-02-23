const express = require('express');
const router = express.Router();
const post = require('./post');
const auth = require('../auth/auth');

router.get('/', auth.authenticate, post.getPost);
router.post('/', auth.authenticate, post.doPublising);
router.put('/', auth.authenticate, post.update);
router.delete('/', auth.authenticate, post.delete);
router.get('/:seq', post.getPostBySeq);
router.post('/tempsave', auth.authenticate, post.doTempSave);

module.exports = router;

