const url = '/api/auth';

//HTML REFERENCES 
const inputName = document.querySelector('#input-name');
const inputPassword = document.querySelector('#input-password');
const btnRegister = document.querySelector('#btn-register');

btnRegister.addEventListener('click', async (e) => {
	e.preventDefault();

	const name = inputName.value.trim();
	const password = inputPassword.value.trim();

	if (name && password) {
		try {
			const data = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					name,
					password
				})
			});
			const { table } = await data.json();

			if (table.name && table.password && table.alive) {

				if (table.role === 'ADMIN') {
					window.location.href = 'admin.html';

				} else if (table.role === 'TABLE_CLIENT') {
					window.location.href = 'client.html';

				}


			}
		} catch (error) {
			console.error(error);
		}

	}
});