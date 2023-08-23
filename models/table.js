const { Schema, model } = require('mongoose');


const TablesSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	order: {
		type: Object,
		required: true
	},
	price: {
		type: Number,
		required: true,
		default: 0
	},
	alive: {
		required: true,
		type: Boolean,
		default: false
	},
	role: {
		required: true,
		type: String,
		default: 'TABLE_CLIENT'
	},
	created_at: {
		type: Date,
		default: Date.now,
		required: true
	},
});

module.exports = model('Table', TablesSchema);