const express = require('express');
require('dotenv').config();
const cors = require('cors');


const { createServer } = require('http');


const { socketController } = require('../sockets/controller.sockets');


const { connectDB } = require('../DB/config');


class Server {
	constructor() {
		this.app = express();
		this.port = process.env.PORT;
		this.server = createServer(this.app);
		this.io = require('socket.io')(this.server);
		this.paths = {
			auth: '/api/auth',
			order: '/api/order',
		};

		this.connectDB();

		this.middlewares();

		this.sockets();

		this.routes();
	}

	async connectDB() {
		await connectDB();
	}

	middlewares() {
		this.app.use(cors());
		this.app.use(express.json());
		this.app.use(express.static('public'));
	}
	sockets() {
		this.io.on('connection', (socket) => socketController(socket, this.io));
	}

	routes() {
		this.app.use(this.paths.auth, require('../routes/auth.routes'));
		this.app.use(this.paths.order, require('../routes/order.routes'));
	}

	listen() {
		this.server.listen(this.port, () => {
			console.log('Server listening on port', this.port);
		});
	}
}

module.exports = Server;