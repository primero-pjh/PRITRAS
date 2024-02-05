const DB = require('../db/pritras.db');

class ScheduleRepository {

	// 특정 유저의 모든 schedule을 들고온다.
	selectSchedules = async (uid) => {
		let [rows, fields] = await DB.query(`
			select *
			from schedule
			where uid = ?
		`, [uid]);

		return rows;
	}

	// schedule 생성
	insertSchedule = async (schedule) => {
		let [row, fields] = await DB.query(`
			INSERT INTO schedule (
				uid, calendar_id, title, body, is_allday,
				start, end, location, attendees, category,
				classification, due_date_class, is_visible, is_pending, is_focused,
				is_private, status, date_added, date_deleted
			) VALUES (
				?, ?, ?, ?, ?, 
				?, ?, ?, ?, ?,
				?, ?, ?, ?, ?,
				?, ?, ?, ?
			)
		`, [
			schedule.uid, schedule.calendarId, schedule.title, schedule.body, (schedule.isAllday) ? 1 : 0,

			schedule.start, schedule.end, schedule.location,
			schedule.attendees ? JSON.stringify(schedule.attendees) : '[]',
			schedule.category,

			schedule.classification, schedule.dueDateClass,
			schedule.isVisible ? 1 : 0,
			schedule.isPending ? 1 : 0,
			schedule.isFocused ? 1 : 0,

			schedule.isPrivate ? 1 : 0,
			1,
			new Date(),
			null,
		]);
		return row.insertId;
	}

	// schedule 생성
	insertSchedule = async (schedule) => {
		let [row, fields] = await DB.query(`
			UPDATE schedule (
				uid, calendar_id, title, body, is_allday,
				start, end, location, attendees, category,
				classification, due_date_class, is_visible, is_pending, is_focused,
				is_private, status, date_added, date_deleted
			) VALUES (
				?, ?, ?, ?, ?, 
				?, ?, ?, ?, ?,
				?, ?, ?, ?, ?,
				?, ?, ?, ?
			)
		`, [
			schedule.uid, schedule.calendarId, schedule.title, schedule.body, (schedule.isAllday) ? 1 : 0,

			schedule.start, schedule.end, schedule.location,
			schedule.attendees ? JSON.stringify(schedule.attendees) : '[]',
			schedule.category,

			schedule.classification, schedule.dueDateClass,
			schedule.isVisible ? 1 : 0, schedule.isPending ? 1 : 0, schedule.isFocused ? 1 : 0,

			schedule.isPrivate ? 1 : 0, 1, new Date(), null,
		]);
		return row.insertId;
	}

	// schedule 생성
	updateSchedule = async (schedule) => {
		let [row, fields] = await DB.query(`
			UPDATE schedule
			SET title=?, body=?, is_allday=?, classification=?, 
				start=?, end=?, location=?, category=?, attendees=?
			WHERE id=?
		`, [
			schedule.title,
			schedule.body,
			(schedule.isAllday) ? 1 : 0,
			schedule.classification,

			schedule.start,
			schedule.end,
			schedule.location,
			schedule.category,
			schedule.attendees ? JSON.stringify(schedule.attendees) : '[]',

			schedule.id,
		]);
		return row.insertId;
	}
}

module.exports = ScheduleRepository;