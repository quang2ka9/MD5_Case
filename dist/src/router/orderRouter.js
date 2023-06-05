"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orderController_1 = __importDefault(require("../controller/orderController"));
const auth_1 = require("../middleware/auth");
const orderDetailRouter_1 = __importDefault(require("./orderDetailRouter"));
const userAuth_1 = require("../middleware/userAuth");
const orderRouter = (0, express_1.Router)();
orderDetailRouter_1.default.use(auth_1.auth);
orderDetailRouter_1.default.use(userAuth_1.userAuth);
orderRouter.get('/bill', orderController_1.default.findOrderUserId);
exports.default = orderRouter;
//# sourceMappingURL=orderRouter.js.map