const path = require('path');
const fs = require('fs');

class Table {
	constructor(number, order = {}) {
		this.number = number;
		this.order = order;
	}
}

class TableControl {
	constructor() {
		this.tables = [];
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

	get tablesArr() {
		return this.tables;
	}
	saveDb() {
		const dbPath = path.join(__dirname, '../DB/db.json');
		fs.writeFileSync(dbPath, JSON.stringify(this.toJSON));
	}
	newTable(number, order) {
		this.tables.push(new Table(number, order));
	}
}

module.exports = TableControl;

