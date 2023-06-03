"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userService_1 = __importDefault(require("../service/userService"));
const orderService_1 = __importDefault(require("../service/orderService"));
class UserController {
    constructor() {
        this.register = async (req, res) => {
            let userCheck = await userService_1.default.checkRegister(req.body);
            if (userCheck) {
                res.status(400).json('User already existed!');
            }
            else if (!req.body.username || !req.body.password) {
                res.status(401).json('Please fill all the information!');
            }
            else {
                await userService_1.default.addUser(req.body);
                await orderService_1.default.createNewOrder(req.body);
                res.status(201).json('Create User Success!');
            }
        };
        this.login = async (req, res) => {
            let resultCheck = await userService_1.default.checkUser(req.body);
            res.status(200).json(resultCheck);
        };
        this.registerGmail = async (req, res) => {
            let userGmailFound = await userService_1.default.findUser(req.body);
            if (userGmailFound) {
                res.status(201).json(await userService_1.default.loginAhead(userGmailFound));
            }
            else {
                let user = await userService_1.default.addUserGmail(req.body);
                await orderService_1.default.createNewOrder(user);
                res.status(201).json(await userService_1.default.loginAhead(user));
            }
        };
    }
}
exports.default = new UserController();
//# sourceMappingURL=userController.js.map