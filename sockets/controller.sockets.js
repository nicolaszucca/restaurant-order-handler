const TableControl = require('../models/tables-control');

const tableControl = new TableControl();
const socketController = (socket) => {

	socket.emit('active-tables', tableControl.tablesArr);

	// socket.join(usuario.id);

};


module.exports = {
	socketController
};