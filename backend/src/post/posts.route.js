const express = require('express');
const router = express.Router();
const post = require('./post');
const auth = require('../auth/auth');

router.get('/', post.checkPage, post.getPosts);

router.get('/top/views', post.getTodayPosts);

router.get('/writing/tempsave', auth.authenticate, post.checkPage, post.getTempsavePosts);

router.get('/writing/public', auth.authenticate, post.checkPage, post.getPublicPosts);

router.get('/writing/private', auth.authenticate, post.checkPage, post.getPrivatePosts);

router.get('/:username', post.checkPage, post.getUserPosts);

module.exports = router;