const appRoot = require('app-root-path');
const path = appRoot.path;
const DB = require(`${path}/db/pritras.db`);

// const User = require(`${path}/entity/titanic.entity`);

class UserRepository {
	findAllOfCompanyCode = async (companyCode) => {
		let [rows, fields] = await DB.query(`
			select *
			from account as u
			where u.company_code = ?
		`, [companyCode]);

		return rows;
	}
}

module.exports = UserRepository;