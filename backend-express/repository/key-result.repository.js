const DB = require('../db/pritras.db');

class KeyResultRepository {
	// objective_id로 매칭되는 모든 key_result를 들고온다.
	selectAllOfObjectiveId = async (objective_id) => {
		let [rows, fields] = await DB.query(`
			SELECT kr.* 
			FROM key_result as kr
			WHERE kr.objective_id = ?
		`, [objective_id]);
		return rows;
	}

	// key-result 생성
	insertKeyResult = async (key_result) => {
		let [row, fields] = await DB.query(`
			INSERT INTO key_result (
				objective_id, 
				title,
				body,
				writer_uid,
				units,
				progress,
				start_date,
				end_date,
				date_added
			) VALUES (
				?, ?, ?, ?, ?, ?, ?, ?, ?
			)
		`, [
			key_result.objective_id,
			key_result.title,
			key_result.body,
			key_result.writer_uid,
			key_result.units,
			key_result.progress,
			(key_result.start_date) ? key_result.start_date : null,
			(key_result.end_date) ? key_result.end_date : null,
			new Date(),
		]);
		return row.insertId;
	}
}

module.exports = KeyResultRepository;