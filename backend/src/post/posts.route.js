const express = require('express');
const router = express.Router();
const post = require('./post');
const jwtProvider = require('../auth/jwt.provider');

router.get('/', post.checkPage, post.getPosts);
router.get('/top/views', post.getTodayPosts);
router.get('/writing/tempsave', jwtProvider.authenticate, post.checkPage, post.getTempsavePosts);
router.get('/writing/public', jwtProvider.authenticate, post.checkPage, post.getPublicPosts);
router.get('/writing/private', jwtProvider.authenticate, post.checkPage, post.getPrivatePosts);
router.get('/:username', post.checkPage, post.getUserPosts);

module.exports = router;