const { validJWTSocket } = require('../middlewares/valid-jwt');

const { validRoleAdmin } = require('../helpers/valid-rol');
const { validState } = require('../helpers/valid-state');

const TableControl = require('../models/tables-control');

const tableControl = new TableControl();
const socketController = async (socket, io) => {
	const user = await validJWTSocket(socket.handshake.headers['x-token']);

	if (!user) { return socket.disconnect(); }

	if (user.role === 'ADMIN') {
		tableControl.logInCentral(user.name);
	} else {
		tableControl.newTable(user.name, null);
	}

	io.emit('active-tables', await tableControl.tablesArr());

	socket.on('disconnect', async () => {
		tableControl.disconnectTable(user.name);
		io.emit('active-tables', await tableControl.tablesArr());
	});

	socket.on('order', async (orders) => {
		if (await validState(user)) {

			const tableDB = await tableControl.newOrder(user.id, orders);

			if (tableDB) {

				io.emit('active-tables', await tableControl.tablesArr());

			} else {
				return 'Error order';
			}
		} else {
			return 'Table disconnect';
		}
	});

	socket.on('signin', async ({ tableName }) => {
		if (validRoleAdmin(user)) {
			const tableDB = await tableControl.connectTable(tableName);

			if (tableDB) {
				io.emit('active-tables', await tableControl.tablesArr());
			} else {
				return 'Error in connect table';
			}
		} else {
			return 'Not admin role';
		}
	});

	socket.on('delete', async ({ tableName }) => {
		if (validRoleAdmin(user)) {

			const tableDB = await tableControl.disconnectTable(tableName);

			if (tableDB) {
				io.emit('active-tables', await tableControl.tablesArr());
			} else {
				return 'Error in disconnect table';
			}
		} else {
			return 'Not admin role';
		}

	});

};


module.exports = {
	socketController
};