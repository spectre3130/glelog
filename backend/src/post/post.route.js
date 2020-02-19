const express = require('express');
const router = express.Router();
const post = require('./post');
const auth = require('../auth/auth');

router.post('/', auth.authenticate, post.doPublising);
router.put('/', auth.authenticate, post.update);
router.delete('/', auth.authenticate, post.delete);
router.get('/:seq', post.getPost);
router.post('/tempsave', auth.authenticate, post.doTempSave);

module.exports = router;

