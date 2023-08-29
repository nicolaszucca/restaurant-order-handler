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

		for (const table of tables) {
			if (table.name === 'Central') continue;
			// Construir la lista de órdenes
			let ordersHtml = '';
			if (table.order.length > 0) {
				ordersHtml = '<ul>';

				for (const orderItems of table.order) {
					for (let item in orderItems) {
						if (item === 'price') continue;
						ordersHtml += `<li><span class="tag is-danger"style="width: 150px" id="order">${item}:${orderItems[item]}</span></li>`;
					}
				}
				ordersHtml += '</ul>';
			} else {
				ordersHtml = '<span class="tag is-danger" id="order">No orders</span>';
			}

			const tableHtml = `
				<tr>
					<td><span><span id="table" class="has-text-weight-bold">${table.name}</span></td>
					<td><span class="tag is-success" id="alive">${table.alive ? 'Alive' : 'Dead'}</span></td>
					<td>${ordersHtml}</td>
					<td><span><span id="price">$${table.price}</span></td>
				</tr>`;

			tbody.insertAdjacentHTML('beforeend', tableHtml);
		}
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