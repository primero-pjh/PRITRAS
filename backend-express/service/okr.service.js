const appRoot = require('app-root-path');
const path = appRoot.path;
const OKRRepository = require(`../repository/okr.repository`);

class OKRService {
	constructor() {
	}
	okrRepository = new OKRRepository();

	findOne = async (okr_id) => {
		// 저장소(Repository)에게 데이터를 요청합니다.
		let data = await this.okrRepository.selectOneOkr(okr_id);
		return data;
	}

	findAllOfWorkSpaceId = async (work_space_id) => {
		// 저장소(Repository)에게 데이터를 요청합니다.
		let data = await this.okrRepository.getAllOfWorkSpaceId(work_space_id);
		return data;
	}
}

module.exports = OKRService;