const { response } = require('express');

const Table = require('../models/table');
const { generateJWT } = require('../helpers/generate-jwt');

const login = async (req, res = response) => {

	const { name, password } = req.body;

	let table = await Table.findOne({ name });

	if (!table) {
		return res.status(404).json({
			msg: 'Table not found'
		});
	}

	if (table.password !== password) {
		return res.status(400).json({
			msg: 'Password incorrect'
		});
	}

	table = await Table.findByIdAndUpdate({ _id: table._id }, { alive: true, }, { new: true });
	const token = await generateJWT(table._id);



	return res.json({
		table,
		token
	});
};


const auth = (req, res = response) => {

	const { name, role } = req.table;
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