const mongoose = require('mongoose');
const { Schema } = mongoose;

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

module.exports = mongoose.model('Post', Post);