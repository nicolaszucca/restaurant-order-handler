//HTML REFERENCES

const tbody = document.querySelector('#tbody');
const centralIsOn = document.querySelector('#central');



const validarToken = async () => {
	const tokenDB = localStorage.getItem('token') || '';

	if (!tokenDB || tokenDB.length < 10) {
		return window.location = '/';
	}

	const validToken = await fetch('/api/auth', {
		headers: {
			'x-token': tokenDB
		}
	});

	const { name, role, token } = await validToken.json();

	if (!token) {

		localStorage.removeItem('token');
		return window.location = '/';
	}
	if (token && role !== 'ADMIN') {
		return window.location = '/client.html';
	}

	if (token && role === 'ADMIN') {
		document.title = name;
		return true;
	}
};



const connectSocket = () => {
	// eslint-disable-next-line no-undef
	const socket = io({
		extraHeaders: {
			'x-token': localStorage.getItem('token')
		}
	});

	socket.on('active-tables', (tables) => {
		tbody.innerHTML = '';

		tables.forEach((table) => {
			const tableHtml = `
			<tr>
				<th><span><span id="table">${table.name}</span></th>
				<td><span class="tag is-success" id="alive">${table.alive ? 'Alive' : 'Dead'}</span></td>
				<td><span class="tag is-danger" id="orders">${table.orders ? table.orders : 'None'}</span></td>
				<td><span><span id="price">$${table.price}</span></td>
			</tr>`;
			tbody.insertAdjacentHTML('beforeend', tableHtml);
		});
	});

	socket.on('connect', () => {

		centralIsOn.classList.remove('has-text-danger');
		centralIsOn.classList.add('has-text-success');

	});

	socket.on('disconnect', () => {

		centralIsOn.classList.remove('has-text-success');
		centralIsOn.classList.add('has-text-danger');

	});

};









const init = async () => {
	const token = await validarToken();
	if (token) {
		connectSocket();
	}
};
init();