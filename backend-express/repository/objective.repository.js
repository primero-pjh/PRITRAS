const DB = require('../db/pritras.db');

class ObjectiveRepository {
	selectAllOfOKRId = async (okr_id) => {
		let [rows, fields] = await DB.query(`
			SELECT *
			FROM objective as obj
			WHERE obj.okr_id = ?
		`, [okr_id]);
		return rows;
	}

	// objective 생성
	insertObjective = async (objective) => {
		let [row, fields] = await DB.query(`
			INSERT INTO objective (
				title, 
				okr_id,
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
			objective.title,
			objective.okr_id,
			objective.writer_uid,
			objective.body,
			objective.status,
			(objective.start_date) ? objective.start_date : null,
			(objective.end_date) ? objective.end_date : null,
			new Date(),
		]);
		return row.insertId;
	}
}

module.exports = ObjectiveRepository;