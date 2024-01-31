const { OK, UNAUTHORIZED, BAD_REQUEST, INTERNAL_SERVER_ERROR } = require(`../helpers/constants`);
const http = require(`../helpers/http`);

const KeyResultService = require('../service/key-result.service');
// const KeyResultManagerService = require('../service/key-result.manager.service');
const keyResultService = new KeyResultService();
// const keyResultManagerService = new KeyResultManagerService();

const KeyResultController = module.exports;

KeyResultController.keyResultAdd = async (req, res) => {
	try {
		let key_result_id = await keyResultService.addKeyResult(req.body.key_result, req.body?.key_result_managers);
		return res.status(OK).json(http.response(key_result_id, OK, '성공적으로 생성하였습니다.'));
	} catch (err) {
		console.log("err:", err);
		return http.errorResponse(res, INTERNAL_SERVER_ERROR, "", err);
	}
}