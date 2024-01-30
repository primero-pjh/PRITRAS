const appRoot = require('app-root-path');
const path = appRoot.path;
const ObjectiveRepository = require(`../repository/objective.repository`);
const ObjectiveManagerRepository = require(`../repository/objective.manager.repository`);
const KeyresultRepo = require(`../repository/key-result.repository`);

class ObjectiveService {
	constructor() {
	}
	objectiveRepository = new ObjectiveRepository();
	objectiveManagerRepository = new ObjectiveManagerRepository();
	keyresultRepo = new KeyresultRepo();

	findAllOfOKRId = async (okr_id) => {
		// 저장소(Repository)에게 데이터를 요청합니다.
		let objectives = await this.objectiveRepository.selectAllOfOKRId(okr_id);

		for (let i = 0; i < objectives.length; i++) {
			let obj = objectives[i];
			obj["objective_managers"] = await this.objectiveManagerRepository.selectAllOfObjectiveId(obj.objective_id);
			obj["key_results"] = await this.keyresultRepo.selectAllOfObjectiveId(obj.objective_id);
		}

		return objectives;
	}
}

module.exports = ObjectiveService;