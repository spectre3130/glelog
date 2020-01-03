const mongoose = require('mongoose');
const { Schema } = mongoose;

const User = new Schema({
    email: String,
    username: String,
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