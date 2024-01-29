const appRoot = require('app-root-path');
const path = appRoot.path;
const router = require('express').Router();
const app = require(`${path}/app`);
const { OK, UNAUTHORIZED, BAD_REQUEST } = require(`${path}/helpers/constants`);
const http = require(`${path}/helpers/http`);

const OKRService = require(`${path}/service/okr.service`);

router.get('/api/okr/:workSpaceId', async (req, res) => {
	let okrs = await new OKRService().findAllOfWorkSpaceId(req.params.workSpaceId);
	return res.status(OK).json(http.response(okrs, OK, null))
});

module.exports = router;