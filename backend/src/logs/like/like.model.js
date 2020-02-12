const mongoose = require('mongoose');
const { Schema } = mongoose;

const Like = new Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    created_at: {
        type: Date,
        default: new Date(),
    },
});

module.exports = mongoose.model('Like', Like);