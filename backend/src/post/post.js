const createError = require('http-errors');
const Post = require('./post.model');
const User = require('../user/user.model');
const Tag = require('../tag/tag.model');
const Counter = require('../util/counter');
const Views = require('../logs/views.model');
const logs = require('../logs/logs');
const moment = require('../config/moment');
const s3 = require('../config/s3');
const auth = require('../auth/auth');

exports.checkPage = async (req, res, next) => {
    try {
        if(req.query.page < 1) {
            throw '잘못된 페이지 요청입니다.';
        }
        next();
    } catch(e) {
        console.error(e);
        next(createError(500, e));
    }
};

exports.getPosts = async (req, res, next) => {
    try {
        const { page, tag } = req.query;
        const match = { posted: true, open: true };
        if(tag) match.tags = tag;
        const posts = await Post.findPostsWithUser(match, page);
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
        const user = await User.findOne({ username });
        if(!user) {
            throw '존재하지 않는 회원입니다.';
        }
        const match = { user: user._id, posted: true, open: true };
        if(await auth.isWriter(req, user)) {
            delete match.open;
        }
        if(tag) match.tags = tag;
        const posts = await Post.findPostsWithUser(match, page);
        res.status(200).json(posts);
    } catch(e) {
        console.error(e);
        next(createError(404, e));
    }
};

exports.getTodayPosts = async (req, res, next) => {
    try {
        const views = await logs.findTodayTopFiveViews();
        const posts = await Promise.all(
            views.map(async(_id) => {
                return await Post.findOne({ _id, open: true })
                    .select('seq title thumb user slug created_at updated_at')
                    .populate('user', 'username avatar');
            })
        ).then(posts => posts.filter(post => post !== null));
        // const posts = await Post.find({ _id: { "$in":  views.map(post => post._id)} });
        res.status(200).json(posts);
    } catch (e) {
        console.error(e);
        next(createError(500, e));
    }
}

exports.getTempsavePosts = async (req, res, next) => {
    try {
        try {
            const { page } = req.query;
            const match = { user: req.user._id, posted: false };
            const sort = { updated_at: -1 }
            const posts = await Post.findPostsWithUser(match, page, sort);
            res.status(200).json(posts);
        } catch(e) {
            console.error(e);
            next(createError(404, e));
        }
    } catch (e) {
        console.error(e);
        next(createError(500, e));
    }
}

exports.getPublicPosts = async (req, res, next) => {
    try {
        const { page } = req.query;
        const match = { user: req.user._id, posted: true, open: true };
        const posts = await Post.findPostsWithUser(match, page);
        res.status(200).json(posts);
    } catch (e) {
        console.error(e);
        next(createError(500, e));
    }
};

exports.getPrivatePosts = async (req, res, next) => {
    try {
        const { page } = req.query;
        const match = { user: req.user._id, posted: true, open: false };
        const posts = await Post.findPostsWithUser(match, page);
        res.status(200).json(posts);
    } catch (e) {
        console.error(e);
        next(createError(500, e));
    }
};

exports.getPost = async (req, res, next) => {
    try {
        const { _id } = req.query;
        const post = await Post.findOne({ _id })
                                .populate('user', 'id email username name avatar description instagram facebook github')
        if(!post) {
            throw '존재하지 않는 포스트입니다.';
        }

        if(await auth.isWriter(req, post.user)) {
            res.status(200).json(post);
        } else {
            throw '존재하지 않는 포스트입니다.';
        }
    } catch(e) {
        console.error(e);
        next(createError(404, e));
    }
};

exports.getPostBySlug = async (req, res, next) => {
    try {
        const { slug } = req.params;
        const post = await Post.findOne({ slug, posted: true })
                                .populate('user', 'id email username name avatar description instagram facebook github')
        if(!post) {
            throw '존재하지 않는 포스트입니다.';
        }

        if(await auth.isWriter(req, post.user) || post.open) {
            await Views.create({ post_id: post._id, post_seq: post.seq });
            res.status(200).json(post);
        } else {
            throw '존재하지 않는 포스트입니다.';
        }
    } catch(e) {
        console.error(e);
        next(createError(404, e));
    }
};

exports.doTempSave = async (req, res, next) => {
    try {
        const post = new Post(req.body);
        post.user = req.user;
        post.title = post.title ? post.title : moment().format('YYYY-MM-DD HH:mm:ss') + ' 저장됨';
        post.body = post.body ? post.body : '';
        post.description = post.description ? post.description : '';
        await post.save();
        res.status(200).json(post);
    } catch(e) {
        console.error(e);
        next(createError(400, e));
    }
};

exports.doPublising = async (req, res, next) => {
    try {
        const { _id, tags, description, open } = req.body;
        const post = await Post.findOne({ _id })
                                .populate('user', 'id email username avatar')
        if(req.user.email !== post.user.email) {    
            throw '해당글을 변경할 수 없습니다.';
        }
        const seq = await Counter.getNextSequence('post');
        Tag.collectTag(tags);
        post.tags = tags;
        post.description = description;
        post.seq = seq;
        post.open = open;
        post.posted = true;
        post.created_at = Date.now();
        post.updated_at = Date.now();
        await post.save();
        res.status(200).json(post);
    } catch(e) {
        console.error(e);
        next(createError(400, e));
    }
};

exports.update = async (req, res, next) => {
    try {
        const { _id, title, body, tags, description, open } = req.body;
        const post = await Post.findOne({ _id }).populate('user', 'email');
        if(req.user.email !== post.user.email) {
            throw '해당글을 변경할 수 없습니다.';
        }
        Tag.collectTag(post.tags);
        post.title = title;
        post.body = body;
        post.description = description;
        post.open = open;
        post.tags = tags;
        post.slug = `${title.replace(/\s/g , "-")}-${Date.now()}`;
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
        const { _id } = req.query;
        const post = await Post.findOne({ _id }).populate('user', 'email');
        if(req.user.email !== post.user.email) {
            throw '해당글을 삭제할 수 없습니다.';
        }
        if(await s3.deleteS3Dir(post._id)) {
            await Views.deleteMany({ post_id: _id })
            await post.remove();
            res.status(204).json(true);
        } else {
            throw '해당글을 삭제할 수 없습니다.';
        }
    } catch(e) {
        console.error(e);
        next(createError(400, e));
    }
};
