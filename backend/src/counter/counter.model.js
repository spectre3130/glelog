const mongoose = require('mongoose');
const { Schema } = mongoose;

const Counter = new Schema({
	_id: {
		type: String,
		unique: true,
	},
	seq: Number
});

module.exports = mongoose.model('Counter', Counter);
