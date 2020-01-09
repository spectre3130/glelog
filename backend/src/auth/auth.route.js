
const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const passportGoogle = require('../auth/google.auth');
const jwtProvider = require('./jwt.provider');

router.get('/check', async (req, res, next) => {
    try {
        if(!req.user) {
            throw '허가되지 않은 사용자 입니다.';
        }
        res.send(200).json(req.user);
    } catch(e) {
        console.error(e);
        next(createError(401, e));
    }
});

router.get('/google', passportGoogle.authenticate('google', { session: false, scope: ['profile', 'email'] }));

router.get('/google/callback', passportGoogle.authenticate('google', { session: false }), async (req, res, next) => {
    try {
        if(!req.user) {
            throw '인증에 실패하였습니다.';
        }
        const { email, username, name, avatar } = req.user;
        const user = { email, username, name, avatar };
        const token = await jwtProvider.generateToken({ user: user});
        res.cookie('_GID', token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 3,
        });
        res.status(200).json(user);
    } catch(e) {
        console.error(e);
        next(createError(400, e));
    }
});

module.exports = router;