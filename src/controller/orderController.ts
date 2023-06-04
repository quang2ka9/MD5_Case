import {Request, Response} from "express";
import orderService from "../service/orderService";


class OrderController {
    private orderService
    constructor() {
        this.orderService = orderService;
    }

    findOrderUserId = async (req: Request, res: Response) => {
        let id = req.params.id;
        let oderUser = await orderService.findAllOrderByUserId(id);
        res.status(200).json(oderUser)
    }

}

export default new OrderController();