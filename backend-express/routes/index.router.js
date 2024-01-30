const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	return res.render('index');
})

router.use('/', require('./user.router'))
router.use('/', require('./work-space.router'))
router.use('/', require('./okr.router'))
router.use('/', require('./objective.router'))
router.use('/', require('./key-result.router'))

module.exports = router;
