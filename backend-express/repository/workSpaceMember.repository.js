const appRoot = require('app-root-path');
const path = appRoot.path;
const DB = require(`${path}/db/pritras.db`);

class WorkSpaceMemberRepository {
	getWorkSpaceMemberOfWorkSpaceId = async (UID) => {
		let [rows, fields] = await DB.query(`
			SELECT *
			FROM workSpaceMembers as wsm
			WHERE UID=?
		`, [UID]);

		return rows;
	}
}

module.exports = WorkSpaceMemberRepository;