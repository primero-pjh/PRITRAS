const appRoot = require('app-root-path');
const path = appRoot.path;
const KeyResultRepository = require(`../repository/key-result.repository`);

class KeyResultService {
	constructor() {
	}
	keyResultRepository = new KeyResultRepository();
	findAllOfObjectiveId = async (objective_id) => {
		try {
			let data = await this.keyResultRepository.selectAllOfObjectiveId(objective_id);
			return data;
		} catch {
			return [];
		}
	}
}

module.exports = KeyResultService;