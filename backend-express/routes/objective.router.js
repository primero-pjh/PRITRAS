const express = require('express');
const router = express.Router();

const ObjectiveController = require(`../controller/objective.controller`);

// 특정 okrId로 objective-list 조회
router.get('/api/objective/okr/:okr_id', ObjectiveController.getAllOfOKRId);

module.exports = router;
