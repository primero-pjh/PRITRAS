const appRoot = require('app-root-path');
const path = appRoot.path;
const DB = require(`${path}/db/pritras.db`);

// const User = require(`${path}/entity/titanic.entity`);

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
}

module.exports = KeyResultRepository;