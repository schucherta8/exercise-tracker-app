const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	firstname: {
		type: String,
		required: true,
		trim: true,
		minlength: 3,
		maxlength: 26,
	},
	lastname: {
		type: String,
		required: true,
		trim: true,
		minlength: 3,
		maxlength: 26,
	},
	username: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		minlength: 3,
	},
	password: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		minlength: 8,
	},
	groups: {
		type: [mongoose.Types.ObjectId], 
		ref: 'Group',
	},
	bet: {
		type: Number,
		min: 0,
	},	
	cash: {
		type: Number,
		min: 0,
	},

}, {
	timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;