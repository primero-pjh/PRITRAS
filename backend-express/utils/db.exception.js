const DB_EXCEPTION = module.exports;;

const http = require(`../helpers/http`);
const { OK, UNAUTHORIZED, BAD_REQUEST, INTERNAL_SERVER_ERROR } = require(`../helpers/constants`);

DB_EXCEPTION.INIT = async (err, req, res, errors) => {
	if (err.code === 'ER_DUP_ENTRY') {
		return http.errorResponse(res, BAD_REQUEST, err.sqlMessage, errors);
	} else {
		return http.errorResponse(res, INTERNAL_SERVER_ERROR, "", err);
	}
}