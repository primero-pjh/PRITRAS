const { OK, UNAUTHORIZED, BAD_REQUEST } = require(`../../helpers/constants`);
const http = require(`../../helpers/http`);
const { body, check, validationResult } = require('express-validator');

const WorkSpaceValidation = module.exports;

WorkSpaceValidation.CheckArray = () => {
	return [
		check('work_space.work_space_name')
			.notEmpty()
			.withMessage("필수입력 항목입니다"),
		check('work_space.work_space_name')
			.notEmpty()
			.isLength({ max: 50 })
			.withMessage("50자 이내로 작성해주세요.")
	]
}

// work_space insert시 발생하는 middleware.validation
WorkSpaceValidation.Add = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return http.errorResponse(res, BAD_REQUEST, '', errors);
	}
	next();
}