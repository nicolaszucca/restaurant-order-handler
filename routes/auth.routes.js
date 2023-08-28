const router = require('express').Router();
const { check } = require('express-validator');


const { login, auth } = require('../controllers/auth.controllers');
const { validate } = require('../middlewares/valid-fields');
const { validJWT } = require('../middlewares/valid-jwt');



// route:  /api/auth 


router.post('/', [
	check('name', 'Name is required').not().isEmpty(),
	check('password', 'Password is required').not().isEmpty(),
	validate
], login);

router.get('/', [
	validJWT,
	validate
], auth);






module.exports = router;