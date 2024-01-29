const appRoot = require('app-root-path');
const path = appRoot.path;
const DB = require(`${path}/db/pritras.db`);

// const User = require(`${path}/entity/titanic.entity`);

class WorkSpaceRepository {
	getWorkSpaceOfWorkSpaceIdList = async (id_list) => {
		let [rows, fields] = await DB.query(`
			SELECT *
			FROM workSpaces as ws
			WHERE ws.workSpaceId IN (${id_list})
			ORDER BY ws.workSpaceName asc
		`, []);
		return rows;
	}
}

module.exports = WorkSpaceRepository;