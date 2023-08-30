const { Schema, model } = require('mongoose');


const CentralSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	role: {
		type: String,
		required: true,
		default: 'ADMIN'
	},
	alive: {
		type: Boolean,
		required: true,
		default: true
	}
});

module.exports = model('Central', CentralSchema);