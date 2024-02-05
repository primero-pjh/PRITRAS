const ScheduleRepository = require(`../repository/schedule.repository`);

class ScheduleService {
	constructor() {
	}
	scheduleRepository = new ScheduleRepository();

	findAll = async (uid) => {
		let data = await this.scheduleRepository.selectSchedules(uid);
		return data;
	}

	addSchedule = async (schedule) => {
		let schedule_id = await this.scheduleRepository.insertSchedule(schedule);
		return schedule_id;
	}

	modifySchedule = async (schedule) => {
		let schedule_id = await this.scheduleRepository.updateSchedule(schedule);
		return schedule_id;
	}
}

module.exports = ScheduleService;