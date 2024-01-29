const appRoot = require('app-root-path');
const path = appRoot.path;
const router = require('express').Router();
const app = require(`${path}/app`);
const UserService = require(`${path}/service/user.service`);
const { OK, UNAUTHORIZED, BAD_REQUEST } = require(`${path}/helpers/constants`);
const http = require(`${path}/helpers/http`);

router.get('/api/company/:companyCode/users', async (req, res) => {
	let users = await new UserService().findAllOfCompanyCode(req.params.companyCode);
	return res.status(OK).json(
		http.response(users, OK, 'UserFound')
	)
});

module.exports = router;