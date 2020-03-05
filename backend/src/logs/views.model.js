const mongoose = require('mongoose');
const { Schema } = mongoose;

const Views = new Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
    },
    identifier: String,
    created_at: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Views', Views);