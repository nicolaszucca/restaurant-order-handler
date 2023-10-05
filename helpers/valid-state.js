
const Table = require('../models/table');
const validState = async (user) => {


	const table = await Table.findOne({ name: user.name });
	if (!table) { return false; }

	if (!table.alive) {
		return false;

	} else {

		return true;
	}
};


module.exports = {
	validState,
};