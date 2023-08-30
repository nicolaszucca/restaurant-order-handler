const { response } = require('express');

const Table = require('../models/table');
const Central = require('../models/central');
const { generateJWT } = require('../helpers/generate-jwt');

const login = async (req, res = response) => {

	const { name, password } = req.body;

	let user;

	user = await Table.findOne({ name });
	if (!user) {
		user = await Central.findOne({ name });
	}

	if (!user) {
		return res.status(404).json({
			msg: 'Table not found'
		});
	}

	if (user.password !== password) {
		return res.status(400).json({
			msg: 'Password incorrect'
		});
	}

	if (user.role !== 'ADMIN') {
		user = await Table.findByIdAndUpdate({ _id: user.id }, { alive: true, }, { new: true });
	}

	const token = await generateJWT(user.id);

	return res.json({
		user,
		token
	});
};


const auth = (req, res = response) => {

	const { name, role } = req.user;

	const token = req.header('x-token');

	if (!name) {
		return res.status(401).json({
			msg: 'Table not found'
		});
	}

	return res.json({
		name,
		role,
		token
	});
};


module.exports = {
	login,
	auth
};