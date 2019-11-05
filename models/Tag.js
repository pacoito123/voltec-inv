const mongoose = require('mongoose');

const TagSchema = mongoose.Schema({
	tag: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('tag', TagSchema);
