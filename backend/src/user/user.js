const createError = require('http-errors');
const User = require('./user.model');

exports.getUser = async (req, res, next) => {
    try {
        const { email } = req.params;
        const user = await User.findOne({ email });
        if(!user) {
            throw '존재하지 않는 회원입니다.';
        }
        res.status(200).json(user);
    } catch(e) {
        console.error(e);
        next(createError(404, e));
    }
}; 

exports.update = async (req, res, next) => {
    try {
        const { email, username, description } = req.body;
        const user = await User.findOne({ email });
        if(req.user.email !== user.email) {
            throw '회원정보를 변경할 수 없습니다.';
        }
        user.username = username;
        user.description = description;
        user.save();
        res.status(200).json(user);
    } catch(e) {
        console.error(e);
        next(createError(400, e));
    }
};

exports.delete = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if(req.user.email !== user.email) {
            throw '탈퇴를 진행할 수 없습니다.';
        }
        user.remove();
        res.cookie('_GID', '');
        res.status(204);
    } catch(e) {
        console.error(e);
        next(createError(400, e));
    }
};
