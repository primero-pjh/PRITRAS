const appRoot = require('app-root-path');
const path = appRoot.path;
const WorkSpaceRepository = require(`${path}/repository/workSpace.repository`);
const WorkSpaceMemberRepository = require(`${path}/repository/workSpaceMember.repository`);

class WorkSpaceService {
	constructor() {
	}
	workSpaceRepository = new WorkSpaceRepository();
	workSpaceMemberRepository = new WorkSpaceMemberRepository();
	findAllOfUserUID = async (UID) => {
		let wm_list = await this.workSpaceMemberRepository.getWorkSpaceMemberOfWorkSpaceId(UID);
		let id_list = wm_list.map((x) => {
			return x.workSpaceId;
		})
		let data = await this.workSpaceRepository.getWorkSpaceOfWorkSpaceIdList(id_list.join(","));
		return data;
	}
}

module.exports = WorkSpaceService;