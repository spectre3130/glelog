const express = require('express');
const router = express.Router();
const post = require('./post');
const s3 = require('../config/s3');
const auth = require('../auth/auth');

router.get('/', auth.authenticate, post.getPost);

router.post('/', 
    auth.authenticate,
    auth.checkWriter,
    post.doPublising);

router.put('/', 
    auth.authenticate,
    auth.checkWriter, 
    post.update);

router.delete('/', auth.authenticate, post.delete);

router.get('/:username/:slug', post.getPostByUsernameAndSlug);

router.post('/autosave', 
    auth.authenticate, 
    auth.checkWriter,
    post.doAutoSave);

router.post('/tempsave', auth.authenticate, post.doTempSave);

module.exports = router;

