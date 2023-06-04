"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productRouter_1 = __importDefault(require("./productRouter"));
const userRouter_1 = require("./userRouter");
const adminRouter_1 = __importDefault(require("./adminRouter"));
const categoryRouter_1 = __importDefault(require("./categoryRouter"));
const orderDetailRouter_1 = __importDefault(require("./orderDetailRouter"));
const orderRouter_1 = __importDefault(require("./orderRouter"));
const router = (0, express_1.Router)();
router.use('/admin', adminRouter_1.default);
router.use('/products', productRouter_1.default);
router.use('/auth', userRouter_1.userRouter);
router.use('/order-detail', orderDetailRouter_1.default);
router.use('/category', categoryRouter_1.default);
router.use('/order', orderRouter_1.default);
exports.default = router;
//# sourceMappingURL=router.js.map