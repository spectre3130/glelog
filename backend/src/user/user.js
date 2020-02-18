const createError = require('http-errors');
const User = require('./user.model');

exports.getUser = async (req, res, next) => {
    try {
        const { username } = req.query;
        const { name, description, avatar, instagram, facebook, github } = await User.findOneElseThrow({ username });
        res.status(200).json({
            username, name, description, avatar, instagram, facebook, github
        });
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
        await req.user.save();
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

exports.checkUsername = async (req, res, next) => {
    try {
        const { username } = req.query;
        const except = [ 'me', 'write', 'writing', 'admin' ];
        if(except.indexOf(username) !== -1){
            res.status(200).json({
                result: false,
                message: '사용 불가능한 별명입니다.'
            });
            return;
        } else if(username.match(/[ \{\}\[\]\/?.,;:|\)*~`!^\-+<>@\#$%&\\\=\(\'\"]/gi)) {
            res.status(200).json({
                result: false,
                message: '공백, 특수문자는 불가능합니다.'
            });
            return;
        } else if(username.length < 2) {
            res.status(200).json({
                result: false,
                message: '두글자 이상 입력해주세요.'
            });
            return;
        } else if(username.length > 15) {
            res.status(200).json({
                result: false,
                message: '최대 15자 미만입니다.'
            });
            return;
        } else if(username === req.user.username) {
            res.status(200).json({
                result: false,
                message: ''
            });
            return;
        }

        if(await User.findOne({ username })) {
            res.status(200).json({
                result: false,
                message: '이미 사용중인 별명입니다.'
            });
        } else {
            res.status(200).json({
                result: true,
                message: '사용 가능한 별명 입니다.'
            });
        }
    } catch(e) {
        console.error(e);
        next(createError(400, e));
    }
}
