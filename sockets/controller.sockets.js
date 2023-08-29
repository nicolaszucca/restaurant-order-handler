const { validJWTSocket } = require('../middlewares/valid-jwt');
const TableControl = require('../models/tables-control');

const tableControl = new TableControl();
const socketController = async (socket, io) => {

	const table = await validJWTSocket(socket.handshake.headers['x-token']);

	if (!table) { return socket.disconnect(); }

	if (table.role === 'ADMIN') {
		tableControl.logInCentral(table.name);
	} else {
		tableControl.newTable(table.name, null);
	}

	io.emit('active-tables', await tableControl.tablesArr());

	socket.on('disconnect', async () => {
		tableControl.disconnectTable(table.name);
		io.emit('active-tables', await tableControl.tablesArr());
	});

	socket.on('order', async (orders) => {
		const tableDB = await tableControl.newOrder(table.id, orders);

		if (tableDB) {

			io.emit('active-tables', await tableControl.tablesArr());

		} else {
			return 'Error order';
		}
	});

};


module.exports = {
	socketController
};