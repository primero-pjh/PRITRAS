const { OK, UNAUTHORIZED, BAD_REQUEST } = require(`../helpers/constants`);
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