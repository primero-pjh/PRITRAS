const express = require('express');
const router = express.Router();
const { body, check, validationResult } = require('express-validator');

const IndexValidation = require(`../middleware/valiator/index.validator`);
const KeyResultController = require(`../controller/key-result.controller`);

// key-result insert
router.post('/api/key-result',
	[
		check('key_result.title')
			.notEmpty()
			.withMessage("필수입력 항목입니다"),

		check('key_result.start_date')
			.custom((value, req) => {
				return !value ? true : check('key_result.start_date').isDate("YYYY-MM-DD");
			})
			.withMessage("올바르지 않은 데이터 형식입니다."),

		check('key_result.end_date')
			.custom((value, req) => {
				return !value ? true : check('key_result.end_date').isDate("YYYY-MM-DD");
			})
			.withMessage("올바르지 않은 데이터 형식입니다."),

		check('key_result.writer_uid')
			.notEmpty(),

		check('key_result.objective_id')
			.notEmpty(),
	],
	IndexValidation.Add,
	KeyResultController.keyResultAdd);

module.exports = router;
