const { OK, UNAUTHORIZED, BAD_REQUEST } = require(`../helpers/constants`);
const http = require(`../helpers/http`);

const ObjectiveManagerService = require(`../service/objective.manager.service`);

const ObjectiveManagerController = module.exports;

ObjectiveManagerController.getAllOfOKRId = async (req, res) => {
	let okrs = await new ObjectiveManagerService().findAllOfOKRId(req.params.okr_id);
	return res.status(OK).json(http.response(okrs, OK, ''));
}