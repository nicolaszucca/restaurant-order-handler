const path = require('path');
const fs = require('fs');

const Table = require('../models/table');

class Tables {
	constructor(name, order = {}) {
		this.name = name;
		this.order = order;
		this.price = 0;
		this.alive = true;
	}
}
class Central {
	constructor(name = '') {
		this.name = name;
	}
}

class TableControl {
	constructor() {
		this.tables = {};
		this.central = {};
		this.date = new Date().getDate();

		this.init();
	}

	init() {
		const { date, tables } = require('../DB/db.json');
		if (date == this.date) {
			this.tables = tables;
		} else {
			this.saveDb();
		}
	}

	get toJSON() {
		return {
			date: this.date,
			tables: this.tables,
		};
	}

	async tablesArr() {

		try {

			return await Table.find({ alive: true });

		} catch (error) {

			return error;
		}

	}
	saveDb() {
		const dbPath = path.join(__dirname, '../DB/db.json');
		fs.writeFileSync(dbPath, JSON.stringify(this.toJSON));
	}
	newTable(name, order) {
		this.tables[name] = new Tables(name, order);
	}

	async newOrder(id, order) {
		return await Table.findByIdAndUpdate(id, { $push: { 'order': order }, $inc: { 'price': order.price } }, { new: true });
	}

	logInCentral(name) {
		this.central[name] = new Central(name);
	}

	disconnectTable(name) {
		delete this.tables[name];
	}
}

module.exports = TableControl;

