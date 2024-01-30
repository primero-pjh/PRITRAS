const appRoot = require('app-root-path');
const path = appRoot.path;
const DB = require(`${path}/db/pritras.db`);

// const User = require(`${path}/entity/titanic.entity`);

class WorkSpaceRepository {
	selectWorkSpace = async (work_space_id) => {
		let [rows, fields] = await DB.query(`
			SELECT * 
			FROM work_space
			WHERE work_space_id = ?
		`, [work_space_id]);
		return rows[0];
	}

	selectWorkSpaceOfWorkSpaceName = async (work_space_name) => {
		let [rows, fields] = await DB.query(`
			SELECT * 
			FROM work_space as ws
			WHERE ws.work_space_name = ?
		`, [work_space_name]);
		console.log("rows:", rows);
		return rows[0];
	}

	// work_space_id의 list형태로 검색
	selectWorkSpaceOfWorkSpaceIdList = async (id_list) => {
		let [rows, fields] = await DB.query(`
			SELECT *
			FROM work_space as ws
			WHERE ws.work_space_id IN (${id_list})
			ORDER BY ws.work_space_name asc
		`, []);
		return rows;
	}

	// work-space 생성
	insertWorkSpace = async (work_space) => {
		let [rows, fields] = await DB.query(`
			INSERT INTO work_space (
				work_space_name, 
				company_code,
				photo,
				owner,
				owner_uid,
				date_added
			) VALUES (
				?, ?, ?, ?, ?, ?
			)
		`, [
			work_space.work_space_name,
			work_space.company_code,
			work_space.photo,
			work_space.owner,
			work_space.owner_uid,
			new Date(),
		]);

		return rows.insertId;
	}

}

module.exports = WorkSpaceRepository;