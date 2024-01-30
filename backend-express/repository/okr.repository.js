const appRoot = require('app-root-path');
const path = appRoot.path;
const DB = require(`${path}/db/pritras.db`);

class OKRRepository {
	selectOneOkr = async (okr_id) => {
		let [rows, fields] = await DB.query(`
			SELECT *
			FROM okr
			WHERE okr_id = ?
		`, [okr_id]);
		return rows[0];
	}

	getAllOfWorkSpaceId = async (work_space_id) => {
		let [rows, fields] = await DB.query(`
			SELECT *
			FROM okr
			WHERE work_space_id = ?
		`, [work_space_id]);
		return rows;
	}
}

module.exports = OKRRepository;