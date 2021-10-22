const router = require('express').Router();
let User = require('../models/user.model');
let Activity = require('../models/activity.model');

//Get all users
router.route('/').get((req, res) => {
	User.find()
	.then(users => res.json(users))
	.catch(err => res.status(400).json(`Error: ${err}`));
});

//Add a user
router.route('/user').post((req,res) => {
	const firstname = req.body.firstname;
	const lastname = req.body.lastname;
	const username = req.body.username;
	const password = req.body.password;
	const weight = req.body.weight;
	const bet = 0;
	const bank = 0;
	const groups = [];

	const newUser = new User({
		firstname,
		lastname,
		username,
		password,
		weight,
		bet,
		bank,
		groups,
	});
	newUser.save()
	.then(() => res.json('User added'))
	.catch(err => res.status(400).json(`Error: ${err}`));
});

//Add user to group
router.route('/user/:uid/group/:gid').post((req, res) => {
	User.findById(req.params.uid)
	.then(user => {
		user.groups = [...user.groups, req.params.gid]
		user.save()
		.then(() => res.json(`User added to ${req.params.gid}`))
		.catch(err => res.json(`Save Error: ${err}`));
	})
	.catch(err => res.json(`Find Error: ${err}`));
});

//Get user by id
router.route('/user/:id').get((req, res) => {
	User.findById(req.params.id)
	.then(user => res.json(user))
	.catch(err => res.status(400).json(`Error: ${err}`));
});

//Get all activities by user id
router.route('/user/:id/activities').get((req, res) => {
	User.findById(req.params.id)
	.populate('activities')
	.then(user => res.json(user.activities))
	.catch(err => res.status(400).json(`Error: ${err}`));
});

//Get all groups by user id
router.route('/user/:id/groups').get((req, res) => {
	User.findById(req.params.id)
	.populate('groups')
	.then(user => res.json(user.groups))
	.catch(err => res.status(400).json(`Error: ${err}`));
});

//Delete user by id
router.route('/user/:id').delete((req, res) => {
	User.findByIdAndDelete(req.params.id)
	.populate('activities')
	.then(() => {
		Activity.deleteMany({user: req.params.id})
		.then(() => res.json('User has been deleted.'))
		.catch(err => res.status(400).json(`Error ${err}`))
	})
	.catch(err => res.status(400).json(`Error: ${err}`))	
});

//Update user personal information by id
router.route('/user/:id').put((req, res) => {
	User.updateOne({_id: req.params.id}, {$set: {
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		username: req.body.username,
		password: req.body.password,
	}})
	.then(() => res.json('Personal Information Update!'))
	.catch(err => res.status(400).json(`Error: ${err}`));
})

//Update user's bet
router.route('/user/:id/bet').put((req, res) => {
	User.updateOne({_id: req.params.id}, {$set: {bet: req.body.bet}})
	.then(() => res.json('Bet updated!'))
	.catch(err => res.status(400).json(`Error: ${err}`));
});

//Update user's bank
router.route('/user/:id/bank').put((req, res) => {

	User.updateOne({_id: req.params.id}, {$inc: {bank: req.body.bank}})
	.then(() => res.json('Bank updated!'))
	.catch(err => res.status(400).json(`Error: ${err}`));
});

//Update user's weight
router.route('/user/:id/weight').put((req, res) => {
	User.updateOne({_id: req.params.id}, {weight: req.body.weight})
	.then(() => res.json('Weight updated!'))
	.catch(err => res.status(400).json(`Error: ${err}`));
});

module.exports = router;