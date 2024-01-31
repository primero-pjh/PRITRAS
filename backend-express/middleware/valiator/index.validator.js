const { OK, UNAUTHORIZED, BAD_REQUEST } = require(`../../helpers/constants`);
const http = require(`../../helpers/http`);
const { body, check, validationResult } = require('express-validator');

const IndexValidation = module.exports;

// insert시 발생하는 middleware.validation
IndexValidation.Add = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return http.errorResponse(res, BAD_REQUEST, '', errors);
	}
	next();
}