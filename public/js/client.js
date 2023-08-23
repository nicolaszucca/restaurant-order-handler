const price = document.getElementById('total-price');
const cantidadInputs = document.querySelectorAll('input[type="number"]');
const numberFormat = new Intl.NumberFormat('es-ar', { style: 'currency', currency: 'ars' });

let totalPrice = 0;

cantidadInputs.forEach(input => {
	input.addEventListener('input', () => {
		actualizarPrecioTotal();
	});
});

function actualizarPrecioTotal() {
	totalPrice = 0;

	cantidadInputs.forEach(input => {
		const cantidad = parseInt(input.value, 10);
		const precio = parseFloat(input.parentNode.previousElementSibling.textContent.replace('$', ''));

		if (cantidad > 0) {
			totalPrice += precio * cantidad;
		}
	});

	price.textContent = `Precio Total: ${numberFormat.format(totalPrice.toFixed(2))}`;
}

document.getElementById('submit-button').addEventListener('click', (e) => {
	e.preventDefault();
	const pedidos = {};
	let totalPrice = 0;

	cantidadInputs.forEach(input => {

		const nombreProducto = input.parentNode.parentNode.querySelector('td:first-child').textContent;
		const cantidad = parseInt(input.value, 10);
		const precio = parseFloat(input.parentNode.previousElementSibling.textContent.replace('$', ''));

		if (cantidad > 0) {
			pedidos[nombreProducto] = cantidad;
			totalPrice += precio * cantidad;
			buyConfirm(pedidos, totalPrice);
		}
	});

});

async function buyConfirm(pedidos, totalPrice) {

	let message = '';
	for (const producto in pedidos) {
		message += `<p class="tag is-large">${producto}: ${pedidos[producto]}</p> <br>`;
	}
	message += `<br><p class="tag is-medium">Precio Total:<span class="tag is-medium is-info is-light">${numberFormat.format(totalPrice.toFixed(2))}</span> </p>`;

	// eslint-disable-next-line no-undef
	Swal.fire({
		title: 'Tu pedido:',
		html: message,
		showCancelButton: true,
		confirmButtonColor: '#48c78e',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Pedir'
	}).then((result) => {
		if (result.isConfirmed) {
			// eslint-disable-next-line no-undef
			Swal.fire(
				'Realizado!',
				'Tu pedido se ha realizado correctamente',
				'success',
			);
			//TODO: tomo la mesa.name y hago update al campo order en la dataBase (fetch para update)
			fetch('/api/order', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					//TODO: validar cliente
					table: 'table-1',
					pedidos,
					totalPrice,
				})
			})
				.then(res => res.json())
				.then(data => {
					console.log(data);
				});
			price.textContent = 'Precio Total: $0';
			cantidadInputs.forEach(input => {
				input.value = '0';
			});
		}
	});
}