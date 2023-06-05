import {AppDataSource} from "../data-source";
import {OrderDetail} from "../enitity/orderDetail";
import {Product} from "../enitity/product";
import {Order} from "../enitity/order";
import orderDetailRouter from "../router/orderDetailRouter";


class OrderDetailService {
    private orderDetailRepository;
    private productRepository;
    private orderRepository;

    constructor() {
        this.orderDetailRepository = AppDataSource.getRepository(OrderDetail);
        this.productRepository = AppDataSource.getRepository(Product);
        this.orderRepository = AppDataSource.getRepository(Order);
    }

    findOrder = async () => {
        return await this.orderDetailRepository.find({
            relations: {order: true, product: true}
        })
    }

    findOrderDetailByOrderId = async (orderId) => {
        return await this.orderDetailRepository.findOne({
            where: {orderId: orderId},
            relations: {order: true, product: true}
        })
    }

    findOrderDetails = async (orderId) => {
        return await this.orderDetailRepository.find({
            relations: {
                order: true,
                product: true
            },
            where: {
                order: {
                    id: orderId,
                    status: "unpaid"
                },
            },
        })
    }

    addOrderDetail = async (orderId, product) => {
        let existOrderDetails = await this.orderDetailRepository.find({
            where: {
                order: {
                    id: orderId
                },
                product: {
                    id: product.productId
                }
            },
        });


        if (existOrderDetails[0]) {
            await this.orderDetailRepository
                .createQueryBuilder()
                .update(OrderDetail)
                .set({
                    price: product.price,
                    quantity: existOrderDetails[0].quantity + product.quantity,
                    totalPrice: product.price * (existOrderDetails[0].quantity + product.quantity),
                    order: orderId,
                    product: product.productId
                })
                .where({order: orderId, product: product.productId})
                .execute()
        } else {
            let newOrderDetail = {
                price: product.price,
                quantity: product.quantity,
                totalPrice: product.price * product.quantity,
                order: orderId,
                product: product.productId
            }
            await this.orderDetailRepository.save(newOrderDetail);
        }
    }


    getPayment = async (orderId, userId) => {
        await this.editOrder(orderId, userId);
        let orderDetails = await this.orderDetailRepository.find({
            where: {
                order: {
                    id: orderId
                }
            },
            relations: {order: true, product: true}
        })
        return orderDetails;
    }

    editOrder = async (orderId, userId) => {
        let totalMoney = 0;
        let orderDetails = await this.orderDetailRepository.find({
            where: {
                order: {
                    id: orderId
                }
            },
            relations: {order: true, product: true}
        });
        orderDetails.map(item => {
            totalMoney += item.totalPrice
        })
        await this.orderRepository
            .createQueryBuilder()
            .update(Order)
            .set({status: "paid", totalMoney: totalMoney})
            .where({id: orderId})
            .execute()
        let newOrder = {
            status: "unpaid",
            totalMoney: 0,
            orderDetails: [],
            user: userId
        };
        await this.orderRepository.save(newOrder);
    }

    deleteOrderDetail = async (orderId) => {
        await this.orderDetailRepository
            .createQueryBuilder()
            .delete()
            .from(OrderDetail)
            .where({id: orderId})
            .execute()
    }

    getHistory = async (id) => {
        return await this.orderDetailRepository.find({
            where: {
                order: {
                    id: id,
                },
            },
            relations: {
                order: true,
                product: true,
            }
        });
    };

}

export default new OrderDetailService();