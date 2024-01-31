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

	selectAllOfWorkSpaceId = async (work_space_id) => {
		let [rows, fields] = await DB.query(`
			SELECT *
			FROM okr
			WHERE work_space_id = ?
		`, [work_space_id]);
		return rows;
	}

	// okr 생성
	insertWorkSpace = async (okr) => {
		let [row, fields] = await DB.query(`
			INSERT INTO okr (
				title, 
				work_space_id,
				writer_uid,
				body,
				status,
				start_date,
				end_date,
				date_added
			) VALUES (
				?, ?, ?, ?, ?, ?, ?, ?
			)
		`, [
			okr.title,
			okr.work_space_id,
			okr.writer_uid,
			okr.body,
			0,
			okr.start_date,
			okr.end_date ? okr.end_date : null,
			new Date(),
		]);

		return row.insertId;
	}
}

module.exports = OKRRepository;