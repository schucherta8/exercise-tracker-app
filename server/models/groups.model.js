const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
	groupname: {
		type: String,
		required: true,
		minlength: 3,
	},
	users: {
		type: [mongoose.Schema.Types.ObjectId], 
		ref: 'User',
	},
	enddate: {
		type: Date,
		required: true
	},
}, {timestamps: true});

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;