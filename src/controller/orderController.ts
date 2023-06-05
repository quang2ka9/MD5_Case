import {Request, Response} from "express";
import orderService from "../service/orderService";

const jwt = require('jsonwebtoken');

class OrderController {
    private orderService

    constructor() {
        this.orderService = orderService;
    }

    findOrderUserId = async (req: Request, res: Response) => {
        let token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.decode(token);
        let oderUser = await orderService.findAllOrderByUserId(decodedToken.idUser);
        res.status(200).json(oderUser)
    }

}

export default new OrderController();