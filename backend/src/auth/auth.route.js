
const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const passportGoogle = require('../auth/google.auth');
const jwtProvider = require('./jwt.provider');
const prod = process.env.NODE_ENV === 'prod';

router.get('/check', async (req, res, next) => {
    try {
        const token = req.cookies['gleid'];
        if(token) {
            const decodedToken = await jwtProvider.verifyToken(token);    
            res.status(200).json(decodedToken.user);
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
        const { user } = await jwtProvider.verifyToken(token);
        res.cookie('gleid', token, {
            domain:'.glelog.dev',
            httpOnly: true,
            secure: true,
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
            domain:'.glelog.dev'
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
        const { email, username, avatar } = req.user;
        const user = { email, username, avatar };
        const token = await jwtProvider.generateToken({ user: user});
        res.redirect(`${prod ? proecess.env.ROOT : 'http://localhost:4200'}?token=${token}`);
    } catch(e) {
        console.error(e);
        next(createError(400, e));
    }
});

module.exports = router;