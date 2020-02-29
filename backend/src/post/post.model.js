const mongoose = require('mongoose');
const { Schema } = mongoose;
const PER_PAGE = 10;

const Post = new Schema({
    seq: Number,
    title: {
        type: String,
        required: '제목을 입력해주세요.'
    },
    body: String,
    thumb: String,
    description: String,
    posted: {
        type: Boolean,
        default: false
    },
    open: {
        type: Boolean,
        default: true
    },
    tags: [String],
    slug: String,
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: '회원정보가 없습니다.'
    },
});


Post.statics.findPostsWithUser  = async function(match, page, sort = { created_at: -1 }) {
    const posts = await this.find(match)
                            .select('seq title thumb description slug posted open tags created_at updated_at user')
                            .populate('user', 'email username avatar')
                            .sort(sort)
                            .skip((page - 1) * PER_PAGE)
                            .limit(PER_PAGE + 1); 
    const count = posts.length;
    if(count === PER_PAGE + 1) posts.pop();
    return {
        posts: posts,
        last: count < PER_PAGE + 1 ? true : false
    }
};

module.exports = mongoose.model('Post', Post);