

// eslint-disable-next-line no-undef
const socket = io();



socket.on('active-tables', (payload) => {
	console.log(payload);
});