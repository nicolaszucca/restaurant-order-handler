const { response } = require('express');

const Table = require('../models/table');

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

	// TODO: hash password


	table = await Table.findByIdAndUpdate({ _id: table._id }, { alive: true, }, { new: true });


	return res.json({
		table
	});
};



module.exports = {
	login,
};