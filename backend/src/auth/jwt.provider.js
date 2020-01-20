const createError = require('http-errors');
const jwt = require('jsonwebtoken');

exports.verifyToken = (token) => {
    if(!token) {
        throw '유효하지 않은 토큰입니다';
    }
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) throw '유효하지 않은 토큰입니다';
            resolve(decoded);
        });
    });
};

exports.generateToken = (payload, options) => {
    const jwtOptions = {
        algorithm: 'HS256',
        issuer: 'glelog.dev',
        expiresIn: '3d',
        ...options
    }
    return new Promise((resolve, reject) => {
        jwt.sign(payload, process.env.JWT_SECRET, jwtOptions, (err, token) => {
            if (err) throw '인증에 실패하였습니다.';
            resolve(token);
        });
    });
};

exports.authenticate = async (req, res, next) => {
    try {
        const token = req.cookies['gleid'];
        const decodedToken = await this.verifyToken(token);
        req.user = decodedToken.user;
        req.tokenExp = decodedToken.exp;
        next();
    } catch(e) {
        console.error(e);
        next(createError(401, e));
    }
};



