const mongoose = require('mongoose');
const { Schema } = mongoose;

const Tag = new Schema({
    name: String,
    created_at: {
        type: Date,
        default: new Date(),
    }
});

module.exports = mongoose.model('Tag', Tag);