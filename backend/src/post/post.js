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

function generateSlug(slug) {
    return `${slug.replace(/\s/g , "-")}-${Date.now()}`
}

function findImages(value) {
    return value.match(/(?<=\!\[(.*?)\]\(https:\/\/images.glelog.dev\/)(.*?)+(?=\))/g);
}


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
        const { page, tag, search } = req.query;
        const match = { posted: true, open: true };
        if(tag) match.tags = tag;
        if(search) match.title = new RegExp(search, 'i');
        const pageable = await Post.findPostsWithUser(match, page);
        res.status(200).json(pageable);
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
        const pageable = await Post.findPostsWithUser(match, page);
        res.status(200).json(pageable);
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
            const pageable = await Post.findPostsWithUser(match, page, sort);
            res.status(200).json(pageable);
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
        const pageable = await Post.findPostsWithUser(match, page);
        res.status(200).json(pageable);
    } catch (e) {
        console.error(e);
        next(createError(500, e));
    }
};

exports.getPrivatePosts = async (req, res, next) => {
    try {
        const { page } = req.query;
        const match = { user: req.user._id, posted: true, open: false };
        const pageable = await Post.findPostsWithUser(match, page);
        res.status(200).json(pageable);
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

exports.getPostByUsernameAndSlug = async (req, res, next) => {
    try {
        const { username, slug } = req.params;
        const post = await Post.findOne({ slug, posted: true })
                                .populate('user', 'id email username name avatar description instagram facebook github', { username })
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
        const { title, body, description } = req.body;
        const post = new Post();
        post.user = req.user;
        post.title = title ? title : moment().format('YYYY-MM-DD HH:mm:ss') + ' 저장됨';
        post.body = body ? body : '';
        post.description = description ? description : ''
        post.slug = generateSlug(post.title)
        await post.save();
        res.status(200).json(post);
    } catch(e) {
        console.error(e);
        next(createError(400, e));
    }
};

exports.doAutoSave = async (req, res, next) => {
    try {
        const { title, body, description } = req.body;
        const { post } = req;
        post.title = title ? title : moment().format('YYYY-MM-DD HH:mm:ss') + ' 저장됨';
        post.body = body ? body : '';
        post.description = description ? description : '';
        post.slug = generateSlug(post.title);
        post.updated_at = Date.now();
        await post.save();
        res.status(200).json(post);
    } catch(e) {
        console.error(e);
        next(createError(400, e));
    }
}

exports.doPublising = async (req, res, next) => {
    try {
        const { description, open, tags } = req.body;
        const { post } = req;
        const seq = await Counter.getNextSequence('post');
        Tag.collectTag(tags);
        post.seq = seq;
        post.description = description;
        post.tags = tags;
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
        const { description, tags, open } = req.body;
        const { post } = req;
        Tag.collectTag(tags);
        post.description = description;
        post.tags = tags;
        post.open = open;
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
        if(await s3.deleteS3Dir(`post/${post._id}`)) {

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

