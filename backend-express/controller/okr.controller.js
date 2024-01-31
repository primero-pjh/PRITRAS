const { OK, UNAUTHORIZED, BAD_REQUEST, INTERNAL_SERVER_ERROR } = require(`../helpers/constants`);
const http = require(`../helpers/http`);

const OKRService = require(`../service/okr.service`);
const DB_EXCEPTION = require('../utils/db.exception');
const okrService = new OKRService();
const OKRController = module.exports;

OKRController.getOkr = async (req, res) => {
	let okr = await okrService.findOne(req.params.okr_id);
	return res.status(OK).json(http.response(okr, OK, ''));
}

OKRController.getOkrsOfWorkSpaceId = async (req, res) => {
	let okrs = await okrService.findAllOfWorkSpaceId(req.params.work_space_id);
	return res.status(OK).json(http.response(okrs, OK, ''));
}

OKRController.okrAdd = async (req, res) => {
	try {

		let okr_id = await okrService.addOKR(req.body.okr);
		return res.status(OK).json(http.response(okr_id, OK, '성공적으로 생성하였습니다.'));
	} catch (err) {
		let errors = {
			errors: [
				{
					type: 'field',
					value: '',
					msg: '이미 존재하는 OKR명 입니다. 변경 후 다시 시도 해주세요.',
					path: 'okr.title',
					location: 'body',
				}
			]
		}
		DB_EXCEPTION.INIT(err, req, res, errors);
		// return http.errorResponse(res, INTERNAL_SERVER_ERROR, "", err);
	}
}