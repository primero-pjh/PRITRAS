const express = require('express');
const router = express.Router();
const { body, check, validationResult } = require('express-validator');

const IndexValidation = require(`../middleware/valiator/index.validator`);
const ObjectiveController = require(`../controller/objective.controller`);

// 특정 okrId로 objective-list 조회
router.get('/api/objective/okr/:okr_id', ObjectiveController.getAllOfOKRId);

// objective insert
router.post('/api/objective',
	[
		check('objective.title')
			.notEmpty()
			.withMessage("필수입력 항목입니다"),

		check('objective.start_date')
			.custom((value, req) => {
				return !value ? true : check('objective.start_date').isDate("YYYY-MM-DD");
			})
			.withMessage("올바르지 않은 데이터 형식입니다."),

		check('objective.end_date')
			.custom((value, req) => {
				return !value ? true : check('objective.end_date').isDate("YYYY-MM-DD");
			})
			.withMessage("올바르지 않은 데이터 형식입니다."),

		check('objective.writer_uid')
			.notEmpty(),

		check('objective.okr_id')
			.notEmpty(),
	],
	IndexValidation.Add,
	ObjectiveController.objectiveAdd);

module.exports = router;
