const appRoot = require('app-root-path');
const path = appRoot.path;
const KeyResultRepository = require('../repository/key-result.repository');
// const KeyResultManagerRepository = require('../repository/key-result.manager.repository');

class KeyResultService {
	constructor() {
	}
	keyResultRepo = new KeyResultRepository();
	// keyResultManagerRepository = new KeyResultManagerRepository();
	findAllOfObjectiveId = async (objective_id) => {
		try {
			let data = await this.keyResultRepo.selectAllOfObjectiveId(objective_id);
			return data;
		} catch {
			return [];
		}
	}

	addKeyResult = async (key_result, key_result_managers) => {
		let key_result_id = await this.keyResultRepo.insertKeyResult(key_result);

		for (let i = 0; i < key_result_managers.length; i++) {
			let x = key_result_managers[i];
			// await this.objectiveManagerRepository.insertObjectiveManager(objective_id, x);
		}

		return key_result_id;
	}
}

module.exports = KeyResultService;