const appRoot = require('app-root-path');
const path = appRoot.path;
const UserRepository = require(`${path}/repository/user.repository`);

class UserService {
	constructor() {
	}
	userRepository = new UserRepository();
	findAllOfCompanyCode = async (companyCode) => {
		// 저장소(Repository)에게 데이터를 요청합니다.
		let data = await this.userRepository.findAllOfCompanyCode(companyCode);
		return data;
	}
}

module.exports = UserService;