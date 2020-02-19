
const express = require('express');
const router = express.Router();
const passportGoogle = require('../auth/google.auth');
const auth = require('./auth');

router.get('/check', auth.check);
router.post('/login', auth.login);
router.get('/logout', auth.logout);
router.get('/google', passportGoogle.authenticate('google', { session: false, scope: ['profile', 'email'] }));
router.get('/google/callback', passportGoogle.authenticate('google', { session: false }), auth.googleCallback);

module.exports = router;