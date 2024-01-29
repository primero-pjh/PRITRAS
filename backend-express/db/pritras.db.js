const mysql = require('mysql2/promise');
require("dotenv").config();

const {
	DB_HOST,
	DB_USER,
	DB_PASS,
	DB_PRITRAS,
} = process.env;

module.exports = mysql.createPool({
	host: DB_HOST,
	user: DB_USER,
	password: DB_PASS,
	database: DB_PRITRAS,
	connectTimeout: 5000,
	connectionLimit: 30 //default 10
});
