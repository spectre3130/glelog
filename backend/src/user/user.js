const createError = require('http-errors');
const User = require('./user.model');

exports.getUser = async (req, res, next) => {
    try {
        const { email } = req.params;
        const user = await User.findOne({ email: email });
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
        const update = { username, description };
        const user = await User.findOneAndUpdate({ email: email }, update);
        if(!user) {
            throw '존재하지 않는 회원입니다.';
        }
        res.status(200).json(user);
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
        res.cookie('_GID', '');
        res.redirect(`${process.env.NODE_ENV === 'prod'? process.env.DOMAIN : 'http://localhost:3000'}`);
    } catch(e) {
        console.error(e);
        next(createError(404, e));
    }
};
