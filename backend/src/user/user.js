const createError = require('http-errors');
const User = require('./user.model');

exports.getUser = async (req, res, next) => {
    try {
        res.status(200).json(req.user);
    } catch(e) {
        console.error(e);
        next(createError(404, e));
    }
}; 

exports.getUserByUsername = async (req, res, next) => {
    try {
        const { username } = req.params;
        const user = await User.findOneElseThrow({ username });
        if(!user) {
            throw '존재하지 않는 회원입니다.';
        }
        res.status(200).json(user);
    } catch(e) {
        console.error(e);
        next(createError(404, e));
    }
}

exports.update = async (req, res, next) => {
    try {
        const { email, username, name, description, instagram, facebook, github } = req.body;
        if(req.user.email !== email) {
            throw '회원정보를 변경할 수 없습니다.';
        }
        req.user.username = username;
        req.user.description = description;
        req.user.name = name;
        req.user.instagram = instagram;
        req.user.facebook = facebook;
        req.user.github = github;
        req.user.save();
        res.status(200).json(req.user);
    } catch(e) {
        console.error(e);
        next(createError(400, e));
    }
};

exports.delete = async (req, res, next) => {
    try {
        const { email } = req.body;
        if(req.user.email !== email) {
            throw '탈퇴를 진행할 수 없습니다.';
        }
        req.user.remove();
        res.cookie('gleid', '');
        res.status(204);
    } catch(e) {
        console.error(e);
        next(createError(400, e));
    }
};

exports.changeAvatar = async (req, res, next) => {
    try {
        const avatar = req.file.location;
        req.user.avatar = avatar;
        req.user.save();
        res.status(200).json(req.user);
    } catch(e) {
        console.error(e);
        next(createError(400, e));
    }
}

exports.checkUsername = async (req, res, next) => {
    try {
        const { username } = req.params;
        const user = await User.findOne({ username });
        if(user) {
            res.status(200).json({
                result: false,
                message: '이미 사용중인 별명입니다.'
            });
        } else {
            res.status(200).json({
                result: true,
                message: '사용가능한 별명 입니다.'
            });
        }
    } catch(e) {
        console.error(e);
        next(createError(400, e));
    }
}
