const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const Table = require('../models/table');
const validJWT = async (req = request, res = response, next) => {

	const token = req.header('x-token');

	if (!token) {
		return res.status(401).json({
			msg: 'No hay token en la petición'
		});
	}


	try {
		const { id } = jwt.verify(token, process.env.JWT_SECRET);

		const table = await Table.findOne({ _id: id });

		if (table) {

			req.table = table;
			next();
		}



	} catch (error) {
		return res.status(401).json({
			msg: 'Invalid token'
		});
	}
};


const validJWTSocket = async (token) => {

	try {
		if (!token) { return; }
		if (token.length < 10) { return; }

		const { id } = jwt.verify(token, process.env.JWT_SECRET);
		const table = await Table.findOne({ _id: id });

		if (!table) { return; }
		if (!table.alive) { return; }

		return table;

	} catch (error) {
		return;
	}
};



module.exports = {
	validJWT,
	validJWTSocket,
};