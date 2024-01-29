const appRoot = require('app-root-path');
const path = appRoot.path;
const router = require('express').Router();
const app = require(`${path}/app`);
const WorkSpaceService = require(`${path}/service/workSpace.service`);
const { OK, UNAUTHORIZED, BAD_REQUEST } = require(`${path}/helpers/constants`);
const http = require(`${path}/helpers/http`);
let workSpaceService = new WorkSpaceService();

router.get('/api/user/:UID/workSpaces', async (req, res) => {
	let work_space_list = await workSpaceService.findAllOfUserUID(req.params.UID);

	return res.status(OK).json(
		http.response(work_space_list, OK, 'UserFound')
	)
});

module.exports = router;