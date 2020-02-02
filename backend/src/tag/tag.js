const createError = require('http-errors');
const User = require('../user/user.model');
const Post = require('../post/post.model');
const Tag = require('../tag/tag.model');

exports.aggregateTags = async (req, res, next) => {
    try {
        const tags = await Post.aggregate([
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
        const user = await User.findOne({ username: username })
        if(!user) {
            throw '존재하지 않는 회원입니다.';
        }
        const tags = await Post.aggregate([
            { $match: { user: user._id } }, 
            { $project: { _id: 0, tags: 1 } },
            { $unwind: '$tags' },
            { $group: { _id: '$tags', count: { $sum: 1 } } },
            { $project: { _id: 0, name: "$_id", value: "$_id", count: 1 } },
            { $sort: { count: -1, name: -1 } }
        ]);
        res.status(200).json(tags);
    } catch(e) {
        console.error(e);
        next(createError(400, e));
    }
}