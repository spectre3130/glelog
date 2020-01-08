const mongoose = require('mongoose');
const { Schema } = mongoose;

const Counter = new Schema({
	model: String,
	seq: Number
});

Counter.statics.getNextSequence = async function(model) {
    const update = { $inc: { seq: 1 } };
    const options = { new: true, upsert: true, fields: { seq: 1, _id: 0 } };
    const result = await this.findOneAndUpdate({ model }, update, options);
    return result.seq;
};

module.exports = mongoose.model('Counter', Counter);
