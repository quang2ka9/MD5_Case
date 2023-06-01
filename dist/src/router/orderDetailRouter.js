"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const userAuth_1 = require("../middleware/userAuth");
const productController_1 = __importDefault(require("../controller/productController"));
const orderDetailController_1 = __importDefault(require("../controller/orderDetailController"));
const orderDetailRouter = (0, express_1.Router)();
orderDetailRouter.use(auth_1.auth);
orderDetailRouter.use(userAuth_1.userAuth);
orderDetailRouter.post('/add/detail/new', productController_1.default.buyProduct);
orderDetailRouter.get('/payment/detail', orderDetailController_1.default.getPayment);
orderDetailRouter.delete('/delete-detail/:id', orderDetailController_1.default.deleteOrderDetail);
orderDetailRouter.get('/history/detail', orderDetailController_1.default.getHistory);
orderDetailRouter.get('/order-details', orderDetailController_1.default.getOrderDetails);
orderDetailRouter.post('/plus/detail', productController_1.default.buyProduct);
orderDetailRouter.post('/minus/detail', productController_1.default.buyProduct);
exports.default = orderDetailRouter;
//# sourceMappingURL=orderDetailRouter.js.map