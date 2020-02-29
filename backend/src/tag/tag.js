const createError = require('http-errors');
const User = require('../user/user.model');
const Post = require('../post/post.model');
const auth = require('../auth/auth');

exports.aggregateTags = async (req, res, next) => {
    try {
        const tags = await Post.aggregate([
            { $match: { posted: true, open: true } }, 
            { $project: { _id: 0, tags: 1 } },
            { $unwind: '$tags' },
            { $group: { _id: '$tags', count: { $sum: 1 } } },
            { $project: { _id: 0, name: "$_id", count: 1 } },
            { $sort: { count: -1, name: -1 } }
        ]);
        res.status(200).json(tags);
    } catch(e) {
        console.error(e);
        next(createError(400, e));
    }
}

exports.aggregateUserTags = async (req, res, next) => {
    try {
        const { username } = req.params;
        const user = await User.findOne({ username: username });
        if(!user) {
            throw '존재하지 않는 회원입니다.';
        }
        const match = { user: user._id, posted: true, open: true };
        if(await auth.isWriter(req, user)) {
            delete match.open;
        }
        const tags = await Post.aggregate([
            { $match: match }, 
            { $project: { _id: 0, tags: 1 } },
            { $unwind: '$tags' },
            { $group: { _id: '$tags', count: { $sum: 1 } } },
            { $project: { _id: 0, name: "$_id", value: "$_id", count: 1 } },
            { $sort: { count: -1, name: -1 } }
        ]);
        res.status(200).json(tags);
    } catch(e) {
        console.error(e);
        next(createError(404, e));
    }
}