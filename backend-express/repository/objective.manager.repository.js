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
}

module.exports = ObjectiveManagerRepository;