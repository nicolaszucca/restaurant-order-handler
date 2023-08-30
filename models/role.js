const { Schema, model } = require('mongoose');


const RoleSchema = new Schema({
	role: {
		type: String,
		required: true,
		enum: ['TABLE_CLIENT', 'ADMIN']
	}
});

module.exports = model('Role', RoleSchema);