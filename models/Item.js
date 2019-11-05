const mongoose = require('mongoose');

const ItemSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	tags: {
		type: Array,
		required: true
	},
	amount: {
		type: Number,
		required: true
	},
	image: {
		type: String,
		required: true
	},
	storedIn: {
		type: String,
		required: true
	},
	grabbedBy: {
		type: Array,
		default: []
	},
	amountGrabbed: {
		type: Number,
		default: 0
	},
	timesGrabbed: {
		type: Number,
		default: 0
	}
});

module.exports = mongoose.model('item', ItemSchema);
