"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const orderService_1 = __importDefault(require("../service/orderService"));
class OrderController {
    constructor() {
        this.findOrderUserId = async (req, res) => {
            let id = req.params.id;
            let oderUser = await orderService_1.default.findAllOrderByUserId(id);
            res.status(200).json(oderUser);
        };
        this.orderService = orderService_1.default;
    }
}
exports.default = new OrderController();
//# sourceMappingURL=orderController.js.map