const express = require('express');
const router = express.Router();
const { body, check, validationResult } = require('express-validator');

const IndexValidation = require(`../middleware/valiator/index.validator`);
const ScheduleController = require(`../controller/schedule.controller`);


// 특정 유저의 모든 schedule을 들고온다.
router.get('/api/schedule/user/:uid', ScheduleController.getSchedules);

// objective insert
router.post('/api/schedule',
	[
		check('schedule.title')
			.notEmpty()
			.withMessage("필수입력 항목입니다"),

		check('schedule.category')
			.notEmpty()
			.withMessage("필수입력 항목입니다"),

		check('schedule.start')
			.custom((value, req) => {
				return !value ? true : check('objective.start').isDate("YYYY-MM-DD");
			})
			.withMessage("올바르지 않은 데이터 형식입니다."),

		check('schedule.end')
			.custom((value, req) => {
				return !value ? true : check('objective.end').isDate("YYYY-MM-DD");
			})
			.withMessage("올바르지 않은 데이터 형식입니다."),

		check('schedule.uid')
			.notEmpty(),
		check('schedule.calendarId')
			.notEmpty(),
	],
	IndexValidation.Add,
	ScheduleController.scheduleAdd);

router.put('/api/schedule',
	[
		check('schedule.title')
			.notEmpty()
			.withMessage("필수입력 항목입니다"),

		check('schedule.category')
			.notEmpty()
			.withMessage("필수입력 항목입니다"),

		check('schedule.start')
			.custom((value, req) => {
				return !value ? true : check('objective.start').isDate("YYYY-MM-DD");
			})
			.withMessage("올바르지 않은 데이터 형식입니다."),

		check('schedule.end')
			.custom((value, req) => {
				return !value ? true : check('objective.end').isDate("YYYY-MM-DD");
			})
			.withMessage("올바르지 않은 데이터 형식입니다."),

		check('schedule.id')
			.notEmpty(),
		check('schedule.uid')
			.notEmpty(),
		check('schedule.calendarId')
			.notEmpty(),
	],
	IndexValidation.Add,
	ScheduleController.scheduleModify);

module.exports = router;
