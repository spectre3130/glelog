const createError = require('http-errors');

exports.changeAvatar = async (req, res, next) => {
    try {
        const avatar = req.file.location;
        req.user.avatar = avatar;
        await req.user.save();
        res.status(200).json(req.user);
    } catch(e) {
        console.error(e);
        next(createError(400, e));
    }
}

exports.savePostImage = async (req, res, next) => {
    try {
        const postImage = req.file.location;
        res.status(200).json(`![](${postImage})`);
    } catch(e) {
        console.error(e);
        next(createError(400, e));
    }
}
