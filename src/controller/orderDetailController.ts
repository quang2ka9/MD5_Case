import {Request, Response} from "express";
import orderService from "../service/orderService";
import orderDetailService from "../service/orderDetailService";


class OrderDetailController {
    constructor() {}
    getPayment = async (req: Request, res: Response) => {
        let userId = req['decode'].idUser;
        let order = await orderService.findOrderByUserId(userId);
        let orderId = order.id;
        res.status(200).json(await orderDetailService.getPayment(orderId,userId))
    }
    deleteOrderDetail = async (req: Request, res: Response) => {
        let orderDetailId = req.params.id;
        await orderDetailService.deleteOrderDetail(orderDetailId);
        res.status(200).json("delete order detail success!")
    }
    getHistory = async  (req: Request, res: Response) => {
        let userId = req['decode'].idUser;
        let order = await orderService.findAllOrderByUserId(userId);
        let orderId = order.id;
        res.status(200).json(await orderDetailService.getHistory(orderId))
    }

    getOrderDetails = async (req: Request, res: Response) => {
        let userId = req['decode'].idUser;
        let order = await orderService.findAllOrderByUserId(userId);
        let orderId = order.id;
        let  cart = await orderDetailService.findOrderDetails(orderId)
        res.status(200).json(cart)
    }

}

export default new OrderDetailController();