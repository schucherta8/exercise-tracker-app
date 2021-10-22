const router = require('express').Router();
let Activity = require('../models/activity.model');

//Get all activities
router.route('/').get((req, res) => {
	Activity.find()
	.then(activitys => res.json(activitys))
	.catch(err => res.status(400).json(`Error: ${err}`));
});

//Add an activity
router.route('/activity').post((req, res) => {
	const user = req.body._id;
	const name = req.body.name;
	const description = req.body.description;
	const date = Date.parse(req.body.date);
	const exercise = req.body.exercise;

	const newActivity = new Activity({
		user,
		name,
		description,
		date,
		exercise,
	});
	newActivity.save()
	.then(() => res.json('Activity Added!'))
	.catch(err => res.status(400).json(`Error: ${err}`));
});

//Get an activity by id
router.route('/activity/:id').get((req, res) => {
	Activity.findById(req.params.id)
	.then(activity => res.json(activity))
	.catch(err => res.status(400).json(`Error: ${err}`));
});

//Delete an acitivity by id
router.route('/activity/:id').delete((req, res) => {
	Activity.findByIdAndDelete(req.params.id)
	.then(() => res.json('Activity Deleted!'))
	.catch(err => res.status(400).json(`Error: ${err}`));
});

//Get activity by type
router.route('activity/:type').get((req, res) => {
	Activity.find({'activity.exercise.type': req.params.type})
	.then(activities => res.json(activities))
	.catch(err => res.status(400).json(`Error ${err}`));
});

//Update activity
router.route('/activity/:id').put((req, res) => {
	Activity.updateOne({_id: req.params.id}, {
		name: req.body.name,
		description: req.body.description,
		date: Date.parse(req.body.description),
		exericse: req.body.exercise,
	})
	.then(() => res.json('Activity updated!'))
	.catch(err => res.status(400).json(`Error: ${err}`));

});
module.exports = router;