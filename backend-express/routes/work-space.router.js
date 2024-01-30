const express = require('express');
const { body, check, validationResult } = require('express-validator');

const router = express.Router();

const WorkSpaceController = require(`../controller/work-space.controller`);
const WorkSpaceValidation = require(`../middleware/valiator/work-space.validator`);


// 특정 workSpace 조회
router.get('/api/work-space/:work_space_id', WorkSpaceController.getWorkSpace)
// 특정 UID로 work-space 조회
router.get('/api/work-space/user/:uid', WorkSpaceController.getWorkSpacesOfUID);

// work_space 생성
router.post('/api/work-space',
	[
		check('work_space.work_space_name')
			.notEmpty()
			.withMessage("필수입력 항목입니다"),
		check('work_space.work_space_name')
			.notEmpty()
			.isLength({ max: 50 })
			.withMessage("50자 이내로 작성해주세요."),
		check('work_space.company_code')
			.notEmpty(),
		check('work_space.owner')
			.notEmpty(),
		check('work_space.owner_uid')
			.notEmpty()
	],
	WorkSpaceValidation.Add, // middleware.validation
	WorkSpaceController.workSpaceAdd);

module.exports = router;
