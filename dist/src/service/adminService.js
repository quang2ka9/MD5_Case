"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../enitity/user");
const data_source_1 = require("../data-source");
class AdminService {
    constructor() {
        this.getAllAccount = async () => {
            let allUser = await this.userRepository.find();
            return allUser;
        };
        this.editRole = async (username) => {
            return await this.userRepository
                .createQueryBuilder()
                .update(user_1.User)
                .set({
                role: "admin"
            })
                .where("username = :username", { username: username })
                .execute();
        };
        this.reRole = async (username) => {
            let resultReRole = await this.editRole(username);
            if (resultReRole)
                return resultReRole;
            else
                return "Khong the doi quyen";
        };
        this.userRepository = data_source_1.AppDataSource.getRepository(user_1.User);
    }
}
exports.default = new AdminService();
//# sourceMappingURL=adminService.js.map