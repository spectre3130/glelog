const express = require('express');
const router = express.Router();
const post = require('./post');
const jwtProvider = require('../auth/jwt.provider');

router.post('/', jwtProvider.authenticate, post.doPublising);
router.put('/', jwtProvider.authenticate, post.update);
router.delete('/', jwtProvider.authenticate, post.delete);
router.get('/:seq', post.getPost);
router.post('/tempsave', jwtProvider.authenticate, post.doTempSave);

module.exports = router;

