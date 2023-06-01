import {Request, Response} from "express";
import productService from "../service/productService";
import orderService from "../service/orderService";
import orderDetailService from "../service/orderDetailService";

class ProductController {

    constructor() {
    }

    findAll = async (req: Request, res: Response) => {
        let listProduct = await productService.getAll();
        res.status(200).json(listProduct)
    }


    addProduct = async (req: Request, res: Response) => {
        await productService.add(req.body);
        if (!req.body.name) {
            res.status(400).json({
                message: 'name missing'
            })
            res.end();
        } else {
            res.status(201).json({
                message: 'OK'
            })
        }
    }


    remove = (req: Request, res: Response) => {
        let id = req.params.id;
        productService.remove(id);
        res.status(200).json({
            message: 'Delete success'
        })
    }
    findProductById = async (req: Request, res: Response) => {
        let id = req.params.id;
        let product = await productService.findProductById(id);
        res.status(200).json(product)
    }
    editProduct = async (req: Request, res: Response) => {
        let id = req.params.id;
        let product = req.body;
        await productService.editProduct(id, product);
        res.status(200).json({
            message: 'Edit success'
        })
    }

    buyProduct = async (req: Request, res: Response) => {
        let userId = req['decode'].idUser;
        let order = await orderService.findOrderByUserId(userId);
        let orderId = order.id;
        let product = req.body;
        await orderDetailService.addOrderDetail(orderId, product);
        let orderDetails = await orderDetailService.findOrderDetails(orderId)
        res.status(200).json(orderDetails)
    }
}

export default new ProductController();