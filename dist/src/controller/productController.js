"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const productService_1 = __importDefault(require("../service/productService"));
const orderService_1 = __importDefault(require("../service/orderService"));
const orderDetailService_1 = __importDefault(require("../service/orderDetailService"));
class ProductController {
    constructor() {
        this.findAll = async (req, res) => {
            const page = +req.query.page || 1;
            const pageSize = +req.query.pageSize || 10;
            const result = await productService_1.default.getAll(page, pageSize, true);
            res.status(200).json(result);
        };
        this.addProduct = async (req, res) => {
            await productService_1.default.add(req.body);
            if (!req.body.name) {
                res.status(400).json({
                    message: 'name missing'
                });
                res.end();
            }
            else {
                res.status(201).json({
                    message: 'OK'
                });
            }
        };
        this.remove = (req, res) => {
            let id = req.params.id;
            productService_1.default.remove(id);
            res.status(200).json({
                message: 'Delete success'
            });
        };
        this.findProductById = async (req, res) => {
            let id = req.params.id;
            let product = await productService_1.default.findProductById(id);
            res.status(200).json(product);
        };
        this.topFiveProduct = async (req, res) => {
            let product = await productService_1.default.topFiveProducts();
            res.status(200).json(product);
        };
        this.editProduct = async (req, res) => {
            let id = req.params.id;
            let product = req.body;
            await productService_1.default.editProduct(id, product);
            res.status(200).json({
                message: 'Edit success'
            });
        };
        this.buyProduct = async (req, res) => {
            let decodedUserId = req['decode'].idUser;
            let order = await orderService_1.default.findOrderByUserId(decodedUserId);
            let orderId = order.id;
            let product = req.body;
            await orderDetailService_1.default.addOrderDetail(orderId, product);
            let orderDetails = await orderDetailService_1.default.findOrderDetails(orderId);
            res.status(200).json(orderDetails);
        };
        this.findByNameProduct = async (req, res) => {
            let name = req.query.name;
            const page = +req.query.page || 1;
            const pageSize = +req.query.pageSize || 10;
            let response = await productService_1.default.findByNameProduct(name, page, pageSize);
            res.status(200).json(response);
        };
        this.findByCategoryId = async (req, res) => {
            let categoryId = req.params.id;
            const page = +req.query.page || 1;
            const pageSize = +req.query.pageSize || 10;
            let products = await productService_1.default.findByCategoryId(categoryId, page, pageSize);
            res.status(200).json(products);
        };
        this.findByPrice = async (req, res) => {
            try {
                let min = req.query.min;
                let max = req.query.max;
                let response = await productService_1.default.findByPrice(min, max);
                res.status(200).json(response);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
    }
}
exports.default = new ProductController();
//# sourceMappingURL=productController.js.map