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
        issuer: 'www.glelog.dev',
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




