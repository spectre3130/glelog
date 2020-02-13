const createError = require('http-errors');

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