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
        default: Date.now,
    }
});

Tag.statics.collectTag = async function(tags) {
    tags.forEach(async name => {
        const tag = await this.findOne({ name });
        if(!tag) {
            this.create({ name });
        }
    });
}

module.exports = mongoose.model('Tag', Tag);