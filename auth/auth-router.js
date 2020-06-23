const router = require('express').Router();
const bcrypt = require('bcryptjs');
const Users = require('../users/users-model.js');

router.post('/register', async (req, res) => {
	const user = req.body;
	const hash = bcrypt.hashSync(user.password, 8);
	user.password = hash;

	try {
		const userInfo = await Users.add(user);

		res.status(201).json(userInfo);
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

router.post('/login', async (req, res) => {
	let { username, password } = req.body;

	try {
		const user = await Users.findBy({ username }).first();

		if (user && bcrypt.compareSync(password, user.password)) {
			req.session.user = user;
			res.status(200).json({ message: `Welcome ${username} !` });
		} else {
			res.status(401).json({ message: 'Invalid credentials' });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
	}
});

module.exports = router;
