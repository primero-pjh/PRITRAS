const express = require('express');
const router = express.Router();

const OKRController = require(`../controller/okr.controller`);

// okr 조회
router.get('/api/okr/:okr_id', OKRController.getOkr);

// 특정 workSpaceId로 okr-list 조회
router.get('/api/okr/work-space/:work_space_id', OKRController.getOkrsOfWorkSpaceId);

module.exports = router;
