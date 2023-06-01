import {AppDataSource} from "../data-source";
import {Order} from "../enitity/order";

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
        return await this.orderRepository.find({
            where: {user: userId },
            relations: {user: true}
        })
    }

}
export default new OrderService();