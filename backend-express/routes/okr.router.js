const express = require('express');
const router = express.Router();
const { body, check, validationResult } = require('express-validator');

const OKRController = require(`../controller/okr.controller`);
const IndexValidation = require(`../middleware/valiator/index.validator`);

// okr 조회
router.get('/api/okr/:okr_id', OKRController.getOkr);

// 특정 workSpaceId로 okr-list 조회
router.get('/api/okr/work-space/:work_space_id', OKRController.getOkrsOfWorkSpaceId);

// okr insert
router.post('/api/okr',
	[
		check('okr.title')
			.notEmpty()
			.withMessage("필수입력 항목입니다"),
		check('okr.start_date')
			.custom((value, req) => {
				return !value ? true : check('okr.start_date').isDate("YYYY-MM-DD");
			})
			.withMessage("올바르지 않은 데이터 형식입니다."),
		check('okr.end_date')
			.custom((value, req) => {
				return !value ? true : check('okr.end_date').isDate("YYYY-MM-DD");
			})
			.withMessage("올바르지 않은 데이터 형식입니다."),
		check('okr.writer_uid')
			.notEmpty(),
		check('okr.work_space_id')
			.notEmpty(),
	],
	IndexValidation.Add,
	OKRController.okrAdd);

module.exports = router;
