const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 3,
	},
	creator: {
		type: String,
		required: true,
		minlength: 3,
	},
	enddate: {
		type: Date,
		required: true
	},
}, {timestamps: true});

groupSchema.virtual('users', {
	ref: 'User',
	localField: '_id',
	foreignField: 'groups',
});

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;