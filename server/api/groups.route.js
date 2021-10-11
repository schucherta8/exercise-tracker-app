const router = require('express').Router();
let Group = require('../models/groups.model');

//Get all groups
router.route('/').get((req, res) => {
	Group.find()
	.then(groups => res.json(groups))
	.catch(err => res.status(400).json(`Error: ${err}`));
});

//Add group to groups list
router.route('/add').post((req,res) => {
	const groupname = req.body.groupname;
	const users = [...req.body.users];
	const enddate = Date.parse(req.body.enddate);

	const newGroup = new Group({
		groupname,
		users,
		enddate,
	});
	newGroup.save()
	.then(() => res.json('Group Added!'))
	.catch(err => res.status(400).json(`Error: ${err}`));
});

//Get group by ID
router.route('/:id').get((req, res) => {
	Group.findById(req.params.id)
	.then(group => res.json(group))
	.catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/:id').delete((req, res) => {
	Group.findByIdAndDelete(req.params.id)
	.then(() => res.json('Group Deleted!'))
	.catch(err => res.status(400).json(`Error: ${err}`));
});

module.exports = router;