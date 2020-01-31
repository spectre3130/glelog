const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const { Schema } = mongoose;
const validator = require('validator');

const User = new Schema({
    seq: Number,
    email: {
        type: String,
        unique: true,
        required: '이메일을 입력해주세요.',
        validate: [validator.isEmail]
    },
    username: {
        type: String,
        unique: true,
        required: '별명을 입력해주세요.'
    },
    name: {
        type: String,
        required: '별명을 입력해주세요.'
    },
    avatar: String,
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

User.plugin(passportLocalMongoose)

User.statics.findOneElseThrow = async function(model) {
    const user = await this.findOne(model);
    if(!user) {
        throw '존재하지 않는 회원입니다.';
    }
    return user;
};

module.exports = mongoose.model('User', User);