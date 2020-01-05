const mongoose = require('mongoose');
const { Schema } = mongoose;

const User = new Schema({
    email: {
        type: String,
        unique: true,
        required: '이메일을 입력해주세요.'
    },
    password: {
        type: String,
        required: '비밀번호를 입력해주세요'
    },
    username: {
        type: String,
        unique: true,
        required: '별명을 입력해주세요.'
    },
    thumbnail: String,
    description: String,
    created_at: {
        type: Date,
        default: new Date(),
    },
    updated_at: {
        type: Date,
        default: new Date(),
    },
});

module.exports = mongoose.model('User', User);