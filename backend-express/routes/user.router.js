const express = require('express');
const router = express.Router();

const UserController = require(`../controller/user.controller`);

router.get('/api/user/company/:company_code', UserController.getUsers);

module.exports = router;
