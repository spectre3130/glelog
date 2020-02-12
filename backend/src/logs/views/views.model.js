const mongoose = require('mongoose');
const { Schema } = mongoose;

const Views = new Schema({
    post_id: string,
    post_seq: Number,
    created_at: {
        type: Date,
        default: new Date(),
    },
});

module.exports = mongoose.model('Like', Like);