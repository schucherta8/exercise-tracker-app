const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
	User.find()
	.then(users => res.json(users))
	.catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/add').post((req,res) => {
	const firstname = req.body.firstname;
	const lastname = req.body.lastname;
	const username = req.body.username;
	const password = req.body.password;
	const groups = [];
	const bet = 0;
	const cash = 0;

	const newUser = new User({
		firstname,
		lastname,
		username,
		password,
		groups,
		bet,
		cash,
	});
	newUser.save()
	.then(() => res.json('User added'))
	.catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/:id').get((req, res) => {
	User.findById(req.params.id)
	.then(user => res.json(user))
	.catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/:id').delete((req, res) => {
	User.findByIdAndDelete(req.params.id)
	.then(() => res.json('User Deleted!'))
	.catch(err => res.status(400).json(`Error: ${err}`))	
});

router.route('/update/:id').post((req, res) => {
	User.findById(req.params.id)
	.then(user => {
		user.firstname = req.body.firstname;
		user.lastname = req.body.lastname;
		user.username = req.body.username;
		user.password = req.body.password;
		user.groups = [...req.body.groups];
		user.save()
		.then(() => res.json('User has been updated!'))
		.catch(err => res.status(400).json(`Error: ${err}`));
	})
	.catch(err => res.status(400).json(`Error: ${err}`))
})

router.route('/update/:id/bet').put((req, res) => {

	User.updateOne({_id: req.params.id}, {$set: {bet: req.body.bet}})
	.then(() => res.json('Bet updated!'))
	.catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/:id/cash').put((req, res) => {

	User.updateOne({_id: req.params.id}, {$inc: {cash: req.body.cash}})
	.then(() => res.json('Bank updated!'))
	.catch(err => res.status(400).json(`Error: ${err}`));
});

module.exports = router;