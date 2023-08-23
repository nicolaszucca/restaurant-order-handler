const mongoose = require('mongoose');

const connectDB = async () => {

	try {

		await mongoose.connect(process.env.MONGODBCONNECTION);
		console.log('DB connected');

	} catch (error) {
		console.log(error);
		throw new Error('Error connecting to database');
	}
};


module.exports = {
	connectDB
};