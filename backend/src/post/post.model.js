const mongoose = require('mongoose');
const User = require('../user/user.model');
const { Schema } = mongoose;

const Post = new Schema({
    title: String,
    body: String,
    thumbnail: String,
    tags: [String],
    created_at: {
        type: Date,
        default: new Date(),
    },
    updated_at: {
        type: Date,
        default: new Date(),
    },
    user: User,
});

module.exports = mongoose.model('Post', Post);