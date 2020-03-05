
const createError = require('http-errors');
const User = require('../user/user.model');
const Post = require('../post/post.model');
const jwtProvider = require('./jwt.provider');
const prod = process.env.NODE_ENV === 'prod';

exports.check = async (req, res, next) => {
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
};

exports.login = async (req, res, next) => {
    try {
        const token = req.body.token
        const { email } = await jwtProvider.verifyToken(token);
        const user = await User.findOneElseThrow({ email });
        res.cookie('gleid', token, {
            domain: prod ? '.glelog.dev' : '',
            httpOnly: true,
            secure: prod ? true : false,
            sameSite: prod ? 'secure': 'none',
            maxAge: 1000 * 60 * 60 * 24 * 3,
        });
        res.status(200).json(user);
    } catch(e) {
        next(createError(401, e));
    }
};

exports.logout = async (req, res, next) => {
    try {
        res.clearCookie('gleid', {
            domain: prod ? '.glelog.dev' : '',
        });
        res.status(200).json();
    } catch(e) {
        next(createError(401, e));
    }
};

exports.googleCallback = async (req, res, next) => {
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
};

exports.authenticate = async (req, res, next) => {
    try {
        const token = req.cookies['gleid'];
        const decodedToken = await jwtProvider.verifyToken(token);
        const user = await User.findOneElseThrow({ email: decodedToken.email });
        if(!user) {
            throw '존재하지 않는 회원입니다.';
        }
        req.user = user;
        req.tokenExp = decodedToken.exp;
        next();
    } catch(e) {
        console.error(e);
        next(createError(401, e));
    }
};

exports.checkWriter = async(req, res, next) => {
    try {
        const { _id } = req.body;
        const post = await Post.findOne({ _id })
                                .populate('user', 'email username avatar');
        if(req.user.email !== post.user.email) {    
            throw '해당글을 변경할 수 없습니다.';
        } else {
            req.post = post;
            next();
        }
    } catch(e) {
        console.error(e);
        next(createError(401, e));
    }
}

exports.isWriter = async(req, user) => {
    const token = req.cookies['gleid'];
    if(token) {
        const decodedToken = await jwtProvider.verifyToken(token);
        return decodedToken.email === user.email ? true : false;
    }
    return false;
};

