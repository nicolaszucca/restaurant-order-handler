const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const Table = require('../models/table');
const Central = require('../models/central');
const validJWT = async (req = request, res = response, next) => {

	const token = req.header('x-token');

	if (!token) {
		return res.status(401).json({
			msg: 'No hay token en la petición'
		});
	}


	try {
		const { id } = jwt.verify(token, process.env.JWT_SECRET);
		let table;

		table = await Table.findOne({ _id: id });

		if (!table) {
			table = await Central.findOne({ _id: id });
		}

		if (table) {

			req.user = table;
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
		let user;
		if (!token) { return; }
		if (token.length < 10) { return; }

		const { id } = jwt.verify(token, process.env.JWT_SECRET);
		user = await Table.findOne({ _id: id });

		if (!user) {
			user = await Central.findOne({ _id: id });
		}

		if (!user) { return; }
		if (!user.alive) { return; }

		return user;

	} catch (error) {
		return;
	}
};



module.exports = {
	validJWT,
	validJWTSocket,
};