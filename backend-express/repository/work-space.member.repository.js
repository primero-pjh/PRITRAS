const appRoot = require('app-root-path');
const path = appRoot.path;
const DB = require(`${path}/db/pritras.db`);

class WorkSpaceMemberRepository {
	getWorkSpaceMemberOfUID = async (uid) => {
		let [rows, fields] = await DB.query(`
			SELECT *
			FROM work_space_member as wsm
			WHERE uid=?
		`, [uid]);

		return rows;
	}

	insertWorkSpaceMember = async (work_space_id, uid) => {
		let [rows, fields] = await DB.query(`
			INSERT INTO work_space_member (
				work_space_id, 
				uid,
				date_added
			) VALUES (
				?, ?, ?
			)
		`, [
			work_space_id, uid, new Date(),
		]).catch((err) => {

		});

		return rows.insertId;
	}
}

module.exports = WorkSpaceMemberRepository;