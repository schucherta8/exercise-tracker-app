const mongoose =  require('mongoose');

const exerciseSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		min: 3,
	},
	type: {
		type: String,
		enum: ['CARDIO', 'WEIGHTLIFTING'],
		default:'CARDIO',
		required: true,
	},
	distance: {
		type: Number,
		min: 0,
	},
	duration: {
		type: Number,
		min: 0,
	},
	weight: {
		type: Number,
		min: 0,
	},
	rep: {
		type: Number,
		min: 1,
		max: 100,
	},
	set: {
		type: Number,
		min: 1,
		max: 20,
	},
});

const activitySchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		required: true,
	},
	exercise: {
		type: exerciseSchema,
		required: true,
	},
}, {
	timestamps: true,
});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;
