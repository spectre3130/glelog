
const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const passportGoogle = require('../auth/google.auth');
const jwtProvider = require('./jwt.provider');

router.get('/google', passportGoogle.authenticate('google', { session: false, scope: ['profile', 'email'] }));

router.get('/google/callback', passportGoogle.authenticate('google', { session: false }), async (req, res, next) => {
    try {
        if(!req.user) {
            throw '인증에 실패하였습니다.';
        }
        const { email, username, name, avatar } = req.user;
        const token = await jwtProvider.generateToken({ user: { email, username, name, avatar }});
        res.cookie('_GID', token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 3,
        });
        res.redirect(`${process.env.NODE_ENV === 'prod'? process.env.DOMAIN : 'http://localhost:3000'}`);
    } catch(e) {
        console.error(e);
        next(createError(400, e));
    }
});

module.exports = router;