"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../enitity/user");
const data_source_1 = require("../data-source");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = require("../middleware/auth");
class UserService {
    constructor() {
        this.addUser = async (user) => {
            user.password = await bcrypt_1.default.hash(user.password, 10);
            user.role = 'user';
            return this.userRepository.save(user);
        };
        this.checkRegister = async (user) => {
            return await this.userRepository.findOne({
                where: {
                    username: user.username
                }
            });
        };
        this.checkUser = async (user) => {
            let userFind = await this.userRepository.findOneBy({ username: user.username });
            if (!userFind) {
                return 'User is not exist';
            }
            else {
                let passWordCompare = await bcrypt_1.default.compare(user.password, userFind.password);
                if (passWordCompare) {
                    let payload = {
                        idUser: userFind.id,
                        username: userFind.username,
                        role: userFind.role
                    };
                    let token = await (jsonwebtoken_1.default.sign(payload, auth_1.SECRET, {
                        expiresIn: 36000 * 10 * 100
                    }));
                    payload['token'] = token;
                    return payload;
                }
                else {
                    return 'Password is wrong';
                }
            }
        };
        this.userRepository = data_source_1.AppDataSource.getRepository(user_1.User);
    }
}
exports.default = new UserService();
//# sourceMappingURL=userService.js.map