
const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const dotenv = require('dotenv');
const passportGoogle = require('../auth/google.auth');
const jwtProvider = require('./jwt.provider');

dotenv.config();

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

router.post('/login', async (req, res, next) => {
    try {
        const token = req.body.token
        const decoded = await jwtProvider.verifyToken(token);
        console.log("TCL: decoded", decoded)
        res.cookie('GID_AUT', token, {
            domain: process.env.NODE_ENV === 'prod' ? process.env.DOMAIN : '',
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 3,
        });
        res.status(200).json(decoded.user);
    } catch(e) {
        next(createError(401, e));
    }
});

router.get('/google', passportGoogle.authenticate('google', { session: false, scope: ['profile', 'email'] }));

router.get('/google/callback', passportGoogle.authenticate('google', { session: false }), async (req, res, next) => {
    try {
        if(!req.user) {
            throw '인증에 실패하였습니다.';
        }
        const { email, username, avatar } = req.user;
        const user = { email, username, avatar };
        const token = await jwtProvider.generateToken({ user: user});
        res.redirect(`http://localhost:4200?token=${token}`);
    } catch(e) {
        console.error(e);
        next(createError(400, e));
    }
});

module.exports = router;