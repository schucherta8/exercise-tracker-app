const router = require('express').Router();
let Group = require('../models/groups.model');
let User = require('../models/user.model');

//Get all groups
router.route('/').get((req, res) => {
	Group.find()
	.then(groups => res.json(groups))
	.catch(err => res.status(400).json(`Error: ${err}`));
});

//Get all users in a group
router.route('/group/:id/users').get((req, res) => {
	Group.findById(req.params.id)
	.populate('users')
	.then(group => res.json(group.users))
	.catch(err => res.status(400).json(`Error: ${err}`));
});

//Add group to groups list
router.route('/group').post((req,res) => {
	const name = req.body.name;
	const creator = req.body.creator;
	const enddate = Date.parse(req.body.enddate);

	const newGroup = new Group({
		name,
		creator,
		enddate,
	});
	newGroup.save()
	.then(() => res.json('Group Added!'))
	.catch(err => res.status(400).json(`Error: ${err}`));
});

//Get group by ID
router.route('/group/:id').get((req, res) => {
	Group.findById(req.params.id)
	.then(group => res.json(group))
	.catch(err => res.status(400).json(`Error: ${err}`));
});

//Remove all users from group by ID
router.route('/group/:id').delete((req, res) => {
	
	Group.findById(req.params.id)
	.populate('users')
	.then(group => {
		group.users.forEach(virtualUser => {
			User.updateOne({_id: virtualUser._id}, {$pull: {groups: req.params.id}})
			.then(() => console.log(`User ${virtualUser.username} group updated.`))
			.catch(err => res.status(400).json(`Error: ${err}`));
		});
		Group.deleteOne({_id: req.params.id})
		.then(() => res.json(`Users removed from group: ${req.params.id}.`))
		.catch(err => res.status(400).json(`Error: ${err}`));
	})
	.catch(err => res.status(400).json(`Error: ${err}`));
});

module.exports = router;