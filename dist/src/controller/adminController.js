"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const adminService_1 = __importDefault(require("../service/adminService"));
class AdminController {
    constructor() {
        this.showAllAcount = async (req, res) => {
            let allAccount = await adminService_1.default.getAllAccount();
            res.status(200).json(allAccount);
        };
        this.reRole = async (req, res) => {
            let username = req.body.username;
            let resultReRole = await adminService_1.default.reRole(username);
            if (resultReRole)
                res.status(200).json({
                    message: 'Edit success'
                });
            else
                res.status(301).json({
                    message: 'Edit fail'
                });
        };
    }
}
exports.default = new AdminController();
//# sourceMappingURL=adminController.js.map