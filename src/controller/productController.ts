import {Request, Response} from "express";
import productService from "../service/productService";
import orderService from "../service/orderService";
import orderDetailService from "../service/orderDetailService";

class ProductController {

    constructor() {
    }

    findAll = async (req: Request, res: Response) => {
        const page = +req.query.page || 1; // Lấy giá trị trang từ query params hoặc mặc định là trang đầu tiên
        const pageSize = +req.query.pageSize || 10; // Lấy giá trị kích thước trang từ query params hoặc mặc định là 10 sản phẩm mỗi trang

        const result = await productService.getAll(page, pageSize);
        res.status(200).json(result);
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

    findByNameProduct = async (req: Request, res: Response) => {
            let name = req.query.name;
            let response = await productService.findByNameProduct(name);
            res.status(200).json(response)
    }

    findByCategoryId = async (req: Request, res: Response) => {
        let categoryId = req.params.categoryId;
        let products = await productService.findByCategoryId(categoryId);
        res.status(200).json(products);
    }

    findByPrice = async (req: Request, res: Response) => {
        try{
            let min = req.query.min;
            let max = req.query.max;
            let response = await productService.findByPrice(min,max);
            res.status(200).json(response)
        }catch (e) {
            res.status(500).json(e.message)
        }

    }

}

export default new ProductController();