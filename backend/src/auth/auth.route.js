
const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const passportGoogle = require('../auth/google.auth');
const jwtProvider = require('./jwt.provider');
const User = require('../user/user.model');
const prod = process.env.NODE_ENV === 'prod';

router.get('/check', async (req, res, next) => {
    try {
        const token = req.cookies['gleid'];
        res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
        if(token) {
            const { email } = await jwtProvider.verifyToken(token);
            const user = await User.findOneElseThrow({ email });
            res.status(200).json(user);
        } else {
            res.status(200).json('');
        }
    } catch(e) {
        console.error(e);
        next(createError(401, e));
    }
});

router.post('/login', async (req, res, next) => {
    try {
        const token = req.body.token
        const { email } = await jwtProvider.verifyToken(token);
        const user = await User.findOneElseThrow({ email });
        res.cookie('gleid', token, {
            domain: prod ? '.glelog.dev' : '',
            httpOnly: true,
            secure: prod ? true : false,
            maxAge: 1000 * 60 * 60 * 24 * 3,
        });
        res.status(200).json(user);
    } catch(e) {
        next(createError(401, e));
    }
});

router.get('/logout', async (req, res, next) => {
    try {
        res.clearCookie('gleid', {
            domain: prod ? '.glelog.dev' : '',
        });
        res.status(200).json();
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
        const { email, username } = req.user;
        const token = await jwtProvider.generateToken({ email });
        res.redirect(`${prod ? process.env.ROOT : 'http://localhost:4200'}?token=${token}`);
    } catch(e) {
        console.error(e);
        next(createError(400, e));
    }
});

module.exports = router;