const { OK, UNAUTHORIZED, BAD_REQUEST, INTERNAL_SERVER_ERROR } = require(`../helpers/constants`);
const http = require(`../helpers/http`);

const ObjectiveService = require(`../service/objective.service`);
const ObjectiveManagerService = require(`../service/objective.manager.service`);
const objectiveService = new ObjectiveService();
const objectiveManagerService = new ObjectiveManagerService();

const ObjectiveController = module.exports;

ObjectiveController.getAllOfOKRId = async (req, res) => {
	let objectives = await objectiveService.findAllOfOKRId(req.params.okr_id);
	return res.status(OK).json(http.response(objectives, OK, ''));
}

ObjectiveController.objectiveAdd = async (req, res) => {
	try {
		let objective_id = await objectiveService.addObjective(req.body.objective, req.body.objective_managers);
		return res.status(OK).json(http.response(objective_id, OK, '성공적으로 생성하였습니다.'));
	} catch (err) {
		console.log("err:", err);
		if (err.code === "ER_DUP_ENTRY") {
			return http.errorResponse(res, BAD_REQUEST, err.sqlMessage, {
				errors: [
					{
						type: 'field',
						value: '',
						msg: '이미 존재하는 목표명 입니다. 변경 후 다시 시도 해주세요.',
						path: 'objective.title',
						location: 'body',
					}
				]
			});
		}
		return http.errorResponse(res, INTERNAL_SERVER_ERROR, "", err);
	}
}