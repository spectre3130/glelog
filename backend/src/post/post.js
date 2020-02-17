const createError = require('http-errors');
const Post = require('./post.model');
const User = require('../user/user.model');
const Tag = require('../tag/tag.model');
const Counter = require('../util/counter');
const Views = require('../logs/views.model');
const logs = require('../logs/logs');
const moment = require('../config/moment');
const PER_PAGE = 10;

exports.getPosts = async (req, res, next) => {
    try {
        const { page, tag } = req.query;
        if(page < 1) {
            throw '잘못된 페이지 요청입니다.';
        }
        const find = { posted: true };
        if(tag) find.tags = tag;
        const posts = await Post.find(find)
                                .populate('user', 'id email username avatar')
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
        const { username } = req.params;
        const { page, tag } = req.query;
        if(page < 1) {
            throw '잘못된 페이지 요청입니다.';
        }
        const user = await User.findOne({ username });
        if(!user) {
            throw '존재하지 않는 회원입니다.';
        }
        const find = { user: user._id, posted: true };
        if(tag) find.tags = tag;
        const posts = await Post.find(find)
                                .populate('user', 'id email username avatar')
                                .sort({ seq: -1 })
                                .skip((page - 1) * PER_PAGE)
                                .limit(PER_PAGE);
        res.status(200).json(posts);
    } catch(e) {
        console.error(e);
        next(createError(404, e));
    }
};

exports.getTodayPosts = async (req, res, nex) => {
    try {
        const views = await logs.findTodayTopFiveViews();
        const posts = await Promise.all(
            views.map(async (_id) => {
                return await Post.findOne({ _id })
                                 .select('seq title thumb user created_at updated_at')
                                 .populate('user', 'username avatar');
            })
        );
        // const posts = await Post.find({ _id: { "$in":  views.map(post => post._id)} });
        res.status(200).json(posts);
    } catch (e) {
        console.error(e);
        next(createError(500, e));
    }
}

exports.getPost = async (req, res, next) => {
    try {
        const { seq } = req.params;
        const post = await Post.findOne({ seq })
                                .populate('user', 'id email username name avatar description instagram facebook github')
        if(!post) {
            throw '존재하지 않는 포스트입니다.';
        }
        await Views.create({ post_id: post._id, post_seq: post.seq });
        res.status(200).json(post);
    } catch(e) {
        console.error(e);
        next(createError(404, e));
    }
};

exports.doTempSave = async (req, res, next) => {
    try {
        const post = new Post(req.body);
        post.title = post.title ? post.title : moment().format('YYYY-MM-DD HH:mm:ss') + ' 저장됨';
        post.body = post.body ? post.body : '';
        post.description = post.description ? post.description : '';
        post.user = req.user.id;
        await post.save();
        res.status(200).json(post);
    } catch(e) {
        console.error(e);
        next(createError(400, e));
    }
};

exports.doPublising = async (req, res, next) => {
    try {
        const { _id, tags } = req.body;
        const post = await Post.findOne({ _id })
                                .populate('user', 'id email username avatar')
        if(req.user.email !== post.user.email) {    
            throw '해당글을 변경할 수 없습니다.';
        }
        const seq = await Counter.getNextSequence('post');
        Tag.collectTag(tags);
        post.tags = tags;
        post.seq = seq;
        post.posted = true;
        post.created_at = Date.now();
        post.updated_at = Date.now();
        await post.save();
        res.status(200).json(post);
    } catch(e) {
        console.error(e);
        next(createError(400, e));
    }
}

exports.update = async (req, res, next) => {
    try {
        const { _id, title, body, tags } = req.body;
        const post = await Post.findOne({ _id }).populate('user', 'email');
        if(req.user.email !== post.user.email) {
            throw '해당글을 변경할 수 없습니다.';
        }
        Tag.collectTag(post.tags);
        post.title = title;
        post.body = body;
        post.tags = tags;
        post.updated_at = Date.now();
        await post.save();
        res.status(200).json(post);
    } catch(e) {
        console.error(e);
        next(createError(400, e));
    }
};

exports.delete = async (req, res, next) => {
    try {
        const post = await Post.findOne({ seq }).populate('user', 'email');
        if(req.user.email !== post.user.email) {
            throw '해당글을 삭제할 수 없습니다.';
        }
        await post.remove();
        res.status(204);
    } catch(e) {
        console.error(e);
        next(createError(400, e));
    }
};
