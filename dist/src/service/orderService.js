"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
const order_1 = require("../enitity/order");
class OrderService {
    constructor() {
        this.createNewOrder = async (user) => {
            let order = {
                status: "unpaid",
                totalMoney: 0,
                user: user,
                orderDetails: []
            };
            return await this.orderRepository.save(order);
        };
        this.findOrderByUserId = async (userId) => {
            return await this.orderRepository.findOne({
                where: { user: userId, status: "unpaid" },
                relations: { user: true }
            });
        };
        this.findAllOrderByUserId = async (userId) => {
            const options = {
                where: {
                    user: { id: userId }
                },
                relations: {
                    user: true,
                },
                select: ['id', 'status', 'totalMoney', 'date'],
                order: { date: 'DESC' },
            };
            const orders = await this.orderRepository.find(options);
            orders.forEach(order => {
                const formattedDate = order.date.toISOString().split('T')[0];
                order.date = formattedDate;
            });
            return orders;
        };
        this.orderRepository = data_source_1.AppDataSource.getRepository(order_1.Order);
    }
}
exports.default = new OrderService();
//# sourceMappingURL=orderService.js.map