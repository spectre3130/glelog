const createError = require('http-errors');
const Post = require('./post.model');
const User = require('../user/user.model');
const Tag = require('../tag/tag.model');
const counter = require('../counter/counter');
const PER_PAGE = 2;

exports.getPosts = async (req, res, next) => {
    try {
        const { page } = req.params;
        if(page < 1) {
            throw '페이지를 찾을 수 없습니다.';
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
            throw '페이지를 찾을 수 없습니다.';
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
        // for(let i = 0 ; i < 4; i++) {
        //     const post = new Post({
        //         seq: await counter.getNextSequence('post'),
        //         title: `${i+1}번째 spectre`,
        //         body: `${i+1}번째 spectre 작성`,
        //         user: user._id,
        //     });
        //     await post.save();
        // }
        res.status(200).send('success');
    } catch(e) {
        console.error(e);
        next(createError(400, e));
    }
}; 

exports.update = async (req, res, next) => {
    try {
        
    } catch(e) {
        console.error(e);
        next(createError(404, e));
    }
};

exports.delete = async (req, res, next) => {
    try {
    
    } catch(e) {
        console.error(e);
        next(createError(404, e));
    }
};
