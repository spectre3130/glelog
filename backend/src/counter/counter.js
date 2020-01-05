const Counter = require('./counter.model');

exports.getNextSequence = async (name) => {
    const option = { new: true, upsert: true };
    const update = { $inc: { seq: 1 } };
    const result = await Counter.findByIdAndUpdate(name, update, option);
    return result.seq;
};