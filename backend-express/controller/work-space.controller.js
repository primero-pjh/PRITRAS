const WorkSpaceService = require(`../service/work-space.service`);
const { OK, UNAUTHORIZED, BAD_REQUEST, INTERNAL_SERVER_ERROR, ER_DUP_ENTRY } = require(`../helpers/constants`);
const http = require(`../helpers/http`);
let workSpaceService = new WorkSpaceService();

const WorkSpaceController = module.exports;

// params : UID
WorkSpaceController.getWorkSpacesOfUID = async (req, res) => {
	let work_spaces = await workSpaceService.findAllOfUserUID(req.params.uid);
	return res.status(OK).json(http.response(work_spaces, OK, ''));
}

WorkSpaceController.getWorkSpace = async (req, res) => {
	let work_space = await workSpaceService.findOne(req.params.work_space_id);
	return res.status(OK).json(http.response(work_space, OK, ''));
}

WorkSpaceController.workSpaceAdd = async (req, res) => {
	try {
		let work_space_id = await workSpaceService.addWorkSpace(req.body);
		return res.status(OK).json(http.response(work_space_id, OK, ''));
	} catch (err) {
		if (err.code === "ER_DUP_ENTRY") {
			return http.errorResponse(res, BAD_REQUEST, err.sqlMessage, {
				errors: [
					{
						type: 'field',
						value: '',
						msg: '이미 존재하는 워크스페이스명 입니다. 변경 후 다시 시도 해주세요.',
						path: 'work_space.work_space_name',
						location: 'body',
					}
				]
			});
		}
		return http.errorResponse(res, INTERNAL_SERVER_ERROR, "", err);
	}
}
