const appRoot = require('app-root-path');
const path = appRoot.path;
const WorkSpaceRepository = require(`../repository/work-space.repository`);
const WorkSpaceMemberRepository = require(`../repository/work-space.member.repository`);

class WorkSpaceService {
	constructor() {
	}
	workSpaceRepository = new WorkSpaceRepository();
	workSpaceMemberRepository = new WorkSpaceMemberRepository();
	findAllOfUserUID = async (uid) => {
		let wm_list = await this.workSpaceMemberRepository.getWorkSpaceMemberOfUID(uid);
		let id_list = wm_list.map((x) => {
			return x.work_space_id;
		});

		try {
			let data = await this.workSpaceRepository.selectWorkSpaceOfWorkSpaceIdList(id_list.join(","));
			return data;
		} catch {
			return [];
		}
	}

	findOne = async (work_space_id) => {
		let data = await this.workSpaceRepository.selectWorkSpace(work_space_id);
		return data;
	}

	findOneOfWorkSpaceName = async (work_space_name) => {
		let work_space = await this.workSpaceRepository.selectWorkSpaceOfWorkSpaceName(work_space_name);
		return work_space;
	}

	addWorkSpace = async (body) => {
		console.log("body:", body);
		// work-space 생성
		let work_space_id = await this.workSpaceRepository.insertWorkSpace(body.work_space);

		// work-space-member 생성
		let work_space_members = body.work_space_members;
		for (let i = 0; i < work_space_members.length; i++) {
			let user = work_space_members[i];
			await this.workSpaceMemberRepository.insertWorkSpaceMember(work_space_id, user.uid);
		}

		return work_space_id;
	}
}

module.exports = WorkSpaceService;