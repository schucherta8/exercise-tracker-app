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
	weight: {
		type: Number,
		min: 80,
		max: 700,
	},
	bet: {
		type: Number,
		min: 0,
	},	
	bank: {
		type: Number,
		min: 0,
	},
	groups: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Group'
	}],
}, {
	timestamps: true,
});

userSchema.virtual('activities', {
	ref: 'Activity',
	localField: '_id',
	foreignField: 'user',
});


const User = mongoose.model('User', userSchema);

module.exports = User;