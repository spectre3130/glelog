const createError = require('http-errors');
const Post = require('./post.model');
const User = require('../user/user.model');
const Tag = require('../tag/tag.model');
const PER_PAGE = 2;

exports.getPosts = async (req, res, next) => {
    try {
        const { page } = req.params;
        if(page < 1) {
            throw '잘못된 페이지 요청입니다.';
        }
        const posts = await Post.find()
                                .populate('user', 'username thumbnail')
                                .sort({ seq: -1 })
                                .skip((page - 1) * PER_PAGE)
                                .limit(PER_PAGE);
        res.status(200).json(posts);
    } catch(e) {
        console.error(e);
        next(createError(404, e));
    }
};

exports.getUserPosts = async (req, res, next) => {
    try {
        const { username, page } = req.params;
        if(page < 1) {
            throw '잘못된 페이지 요청입니다.';
        }
        const user = await User.findOne({ username: username });
        if(!user) {
            throw '존재하지 않는 회원입니다.';
        }
        const posts = await Post.find({ user: user._id })
                                .sort({ seq: -1 })
                                .skip((page - 1) * PER_PAGE)
                                .limit(PER_PAGE);
        res.status(200).json(posts);
    } catch(e) {
        console.error(e);
        next(createError(404, e));
    }
};

exports.getPost = async (req, res, next) => {
    try {
        const { seq } = req.params;
        const post = await Post.findOne({ seq: seq });
        if(!post) {
            throw '존재하지 않는 포스트입니다.';
        }
        res.status.json(post);
    } catch(e) {
        console.error(e);
        next(createError(404, e));
    }
};

exports.create = async (req, res, next) => {
    try {
        const post = new Post(req.body);
        Post.collectTag(post.tags);
        post.save();
        res.status(200).json(post);
    } catch(e) {
        console.error(e);
        next(createError(400, e));
    }
}; 

exports.update = async (req, res, next) => {
    try {
        const { seq, title, body, thumbnail, tags } = req.body;
        const post = findOne({ seq });
        if(req.user.email !== post.user.email) {
            throw '해당글을 변경할 수 없습니다.';
        }
        post.title = title;
        post.body = body;
        post.thumbnail = thumbnail,
        post.tags = tags;
        post.save();
        Post.collectTag(post.tags);
        res.status(200).json(post);
    } catch(e) {
        console.error(e);
        next(createError(400, e));
    }
};

exports.delete = async (req, res, next) => {
    try {
        const post = findOne({ seq }).populate('user');
        if(req.user.email !== post.user.email) {
            throw '해당글을 삭제할 수 없습니다.';
        }
        post.remove();
        res.status(204);
    } catch(e) {
        console.error(e);
        next(createError(400, e));
    }
};
