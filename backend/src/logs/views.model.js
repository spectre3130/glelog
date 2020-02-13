const mongoose = require('mongoose');
const { Schema } = mongoose;

const Views = new Schema({
    post_id: String,
    post_seq: Number,
    created_at: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Views', Views);