const appRoot = require('app-root-path');
const path = appRoot.path;
const DB = require(`${path}/db/pritras.db`);

class OKRRepository {
	getAllOfWorkSpaceId = async (workSpaceId) => {
		let [rows, fields] = await DB.query(`
			SELECT *
			FROM OKR as okr
			WHERE okr.workSpaceId = ?
		`, [workSpaceId]);
		return rows;
	}
}

module.exports = OKRRepository;