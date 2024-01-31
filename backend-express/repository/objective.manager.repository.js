const appRoot = require('app-root-path');
const path = appRoot.path;
const DB = require(`${path}/db/pritras.db`);

class ObjectiveManagerRepository {
	selectAllOfObjectiveId = async (objective_id) => {
		let [rows, fields] = await DB.query(`
			SELECT obj_m.*,
				u.photo, u.user_name
			FROM objective_manager as obj_m
			JOIN account as u on obj_m.manager_uid = u.uid
			WHERE obj_m.objective_id = ?
		`, [objective_id]);
		return rows;
	}

	// objective-manager 생성
	insertObjectiveManager = async (objective_id, objective_manager) => {
		let [row, fields] = await DB.query(`
			INSERT INTO objective_manager (
				objective_id, 
				manager_uid,
				date_added
			) VALUES (
				?, ?, ?
			)
		`, [
			objective_id,
			objective_manager.uid,
			new Date(),
		]);
		return row.insertId;
	}
}

module.exports = ObjectiveManagerRepository;