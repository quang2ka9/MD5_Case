"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const adminAuth_1 = require("../middleware/adminAuth");
const adminController_1 = __importDefault(require("../controller/adminController"));
const adminRouter = (0, express_1.Router)();
adminRouter.use(auth_1.auth);
adminRouter.use(adminAuth_1.adminAuth);
adminRouter.get('/alluser', adminController_1.default.showAllAcount);
adminRouter.put('/rerole', adminController_1.default.reRole);
exports.default = adminRouter;
//# sourceMappingURL=adminRouter.js.map