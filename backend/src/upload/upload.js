const createError = require('http-errors');
const Post = require('../post/post.model');

exports.changeAvatar = async (req, res, next) => {
    try {
        const avatar = req.file.key;
        req.user.avatar = `${process.env.IMAGES}/${avatar}`;
        await req.user.save();
        res.status(200).json(req.user);
    } catch(e) {
        console.error(e);
        next(createError(400, e));
    }
}

exports.savePostImage = async (req, res, next) => {
    try {
        const postImage = req.file.key;
        res.status(200).json(`![](${process.env.IMAGES}/${postImage})`);
    } catch(e) {
        console.error(e);
        next(createError(400, e));
    }
}

exports.saveThumb = async (req, res, next) => {
    try {
        const { _id } = req.query;
        const thumb = req.file.key;
        const post = await Post.findOne({ _id });
        post.thumb = `${process.env.IMAGES}/${thumb}`;
        await post.save();
        res.status(200).json(post.thumb);
    } catch(e) {
        console.error(e);
        next(createError(400, e));
    }
}
