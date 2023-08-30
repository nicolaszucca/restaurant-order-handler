const validRoleAdmin = (user) => {

	const { role } = user;

	if (!role) {
		return false;
	}

	if (role !== 'ADMIN') {
		return false;
	}

	return true;

};


module.exports = {
	validRoleAdmin,
};