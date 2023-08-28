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

	io.emit('active-tables', tableControl.tablesArr);

	socket.on('disconnect', () => {
		tableControl.disconnectTable(table.name);
		io.emit('active-tables', tableControl.tablesArr);
	});

	socket.on('order', (table, pedidos, totalPrice) => {
		console.log('PEDIDO:', table, pedidos, totalPrice);
	});

};


module.exports = {
	socketController
};