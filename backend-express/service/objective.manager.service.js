const appRoot = require('app-root-path');
const path = appRoot.path;
const ObjectiveManagerRepository = require(`../repository/objective.manager.repository`);

class ObjectiveService {
	constructor() {
	}
	objectiveManagerRepository = new ObjectiveManagerRepository();

	findAllOfObjectiveId = async (objective_id) => {
		// 저장소(Repository)에게 데이터를 요청합니다.
		let data = await this.objectiveManagerRepository.selectAllOfObjectiveId(objective_id);
		return data;
	}
}

module.exports = ObjectiveService;