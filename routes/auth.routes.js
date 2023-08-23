const router = require('express').Router();
const { check } = require('express-validator');


const { login } = require('../controllers/auth.controllers');
const { validate } = require('../middlewares/valid-fields');



// route:  /api/auth 


router.post('/', validate([
	check('name', 'Name is required').not().isEmpty(),
	check('password', 'Password is required').not().isEmpty(),
]), login);







module.exports = router;