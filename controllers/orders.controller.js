const { response } = require('express');

// const Table = require('../models/table');

const takeOrder = async (req, res = response) => {

	const { table, pedidos, totalPrice } = req.body;

	console.log(table, pedidos, totalPrice);
	/* let table = await Table.findOne({ name });

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


	return res.json({
		table
	}); */
};



module.exports = {
	takeOrder,
};
