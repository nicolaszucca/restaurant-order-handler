const { validationResult } = require('express-validator');


const validate = (req, res, next) => {
	const result = validationResult(req);
	if (!result.isEmpty()) {
		return res.send({ errors: result.array() });
	}
	return next();
};

module.exports = {
	validate,
};