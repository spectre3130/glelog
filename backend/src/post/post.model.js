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
    slug: String,
    posted: {
        type: Boolean,
        default: false
    },
    open: {
        type: Boolean,
        default: true
    },
    tags: [String],
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
    return await this.find(match)
        .select('seq title body thumb description slug open tags created_at updated_at user')
        .populate('user', 'id email username avatar')
        .sort(sort)
        .skip((page - 1) * PER_PAGE)
        .limit(PER_PAGE); 
};

module.exports = mongoose.model('Post', Post);