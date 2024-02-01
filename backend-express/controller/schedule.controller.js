const { OK, UNAUTHORIZED, BAD_REQUEST, INTERNAL_SERVER_ERROR } = require(`../helpers/constants`);
const http = require(`../helpers/http`);

const ScheduleService = require(`../service/schedule.service`);
const scheduleService = new ScheduleService();

const ScheduleController = module.exports;

ScheduleController.getSchedules = async (req, res) => {
	let schedules = await scheduleService.findAll(req.params.uid);
	return res.status(OK).json(http.response(schedules, OK, ''));
}

ScheduleController.scheduleAdd = async (req, res) => {
	console.log("schedule:", req.body);
	try {
		let schedule_id = await scheduleService.addSchedule(req.body.schedule);
		return res.status(OK).json(http.response(schedule_id, OK, '성공적으로 생성하였습니다.'));
	} catch (err) {
		console.log("err:", err);
		return http.errorResponse(res, INTERNAL_SERVER_ERROR, "", err);
	}
}