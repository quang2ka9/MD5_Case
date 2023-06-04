import {AppDataSource} from "../data-source";
import {Order} from "../enitity/order";
import {FindManyOptions} from "typeorm";

class OrderService {
    private orderRepository;

    constructor() {
        this.orderRepository = AppDataSource.getRepository(Order);
    }
     createNewOrder = async (user) => {
        let order = {
            status: "unpaid",
            totalMoney: 0,
            user: user,
            orderDetails: []
        }
        return await this.orderRepository.save(order)
    }


    findOrderByUserId = async (userId) => {
       return await this.orderRepository.findOne({
           where: {user: userId, status: "unpaid"},
           relations: {user: true}
       })
    }


    findAllOrderByUserId = async (userId) => {
        const options: FindManyOptions<Order> = {
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
    }



}
export default new OrderService();