const appRoot = require('app-root-path');
const path = appRoot.path;
const OKRRepository = require(`${path}/repository/okr.repository`);

class OKRService {
	constructor() {
	}
	okrRepository = new OKRRepository();
	findAllOfWorkSpaceId = async (workSpaceId) => {
		// 저장소(Repository)에게 데이터를 요청합니다.
		let data = await this.okrRepository.getAllOfWorkSpaceId(workSpaceId);
		return data;
	}
}

module.exports = OKRService;