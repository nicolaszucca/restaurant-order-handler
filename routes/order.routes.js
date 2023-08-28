const router = require('express').Router();
const { check } = require('express-validator');


const { takeOrder } = require('../controllers/orders.controller');

const { validate } = require('../middlewares/valid-fields');



// route:  /api/order 


router.post('/', [
	check('table', 'Table is required').not().isEmpty(),
	check('pedidos', 'Order is required').not().isEmpty(),
	check('totalPrice', 'Price is required').not().isEmpty(),
	validate
], takeOrder);





module.exports = router;

