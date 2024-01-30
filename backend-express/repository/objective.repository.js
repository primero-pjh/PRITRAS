const appRoot = require('app-root-path');
const path = appRoot.path;
const DB = require(`${path}/db/pritras.db`);

class ObjectiveRepository {
	selectAllOfOKRId = async (okr_id) => {
		let [rows, fields] = await DB.query(`
			SELECT *
			FROM objective as obj
			WHERE obj.okr_id = ?
		`, [okr_id]);
		return rows;
	}
}

module.exports = ObjectiveRepository;