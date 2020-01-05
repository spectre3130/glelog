const mongoose = require('mongoose');
const { Schema } = mongoose;

const Tag = new Schema({
    name: {
        type: String,
        unique: true,
        required: '태그를 입력해주세요.'
    },
    created_at: {
        type: Date,
        default: new Date(),
    }
});

module.exports = mongoose.model('Tag', Tag);