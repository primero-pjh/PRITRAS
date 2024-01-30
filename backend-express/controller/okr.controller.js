const { OK, UNAUTHORIZED, BAD_REQUEST } = require(`../helpers/constants`);
const http = require(`../helpers/http`);

const OKRService = require(`../service/okr.service`);

const OKRController = module.exports;

OKRController.getOkr = async (req, res) => {
	let okr = await new OKRService().findOne(req.params.okr_id);
	return res.status(OK).json(http.response(okr, OK, ''));
}

OKRController.getOkrsOfWorkSpaceId = async (req, res) => {
	let okrs = await new OKRService().findAllOfWorkSpaceId(req.params.work_space_id);
	return res.status(OK).json(http.response(okrs, OK, ''));
}