const createError = require('http-errors');
const User = require('./user.model');

exports.getUser = async (req, res, next) => {
    try {
        const { username } = req.params;
        const user = await User.findOne({ username: username });
        if(!user) {
            throw '존재하지 않는 회원입니다.';
        }
        res.status(200).json(user);
    } catch(e) {
        console.error(e);
        next(createError(404, e));
    }
};

exports.create = async (req, res, next) => {
    try {
        const { email, username } = req.body;
        const invalidEmail = await User.findOne({ email: email });
        if(invalidEmail) {
            throw '중복된 이메일 입니다.';
        }
        const invalidUsername = await User.findOne({ username: username });
        if(invalidUsername) {
            throw '중복된 별명 입니다.';
        }
        const user = new User(req.body);
        await user.save();
        res.status(201).send('회원가입 완료');
    } catch(e) {
        console.error(e);
        next(createError(400, e));
    }
}; 

exports.update = async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const user = await User.findOne({ email: email });
        if(!user) {
            throw '존재하지 않는 회원입니다.';
        }
        user.username = username;
        user.password = password;
        await user.save();
        res.status(200).send('회원정보 변경완료');
    } catch(e) {
        console.error(e);
        next(createError(404, e));
    }
};

exports.delete = async (req, res, next) => {
    try {
        const { email } = req.body;
        const result = await User.deleteOne({ email: email });
        if(!result.deletedCount) {
            throw '존재하지 않는 회원입니다.';
        }
        res.status(200).send('회원 탈퇴완료');
    } catch(e) {
        console.error(e);
        next(createError(404, e));
    }
};
