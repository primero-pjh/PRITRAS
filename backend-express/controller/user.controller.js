const router = require('express').Router();
const UserService = require(`../service/user.service`);
const { OK, UNAUTHORIZED, BAD_REQUEST } = require(`../helpers/constants`);
const http = require(`../helpers/http`);

const UserController = module.exports;

UserController.getUsers = async (req, res) => {
	let users = await new UserService().findAllOfCompanyCode(req.params.company_code);
	return res.status(OK).json(http.response(users, OK, ''))
}