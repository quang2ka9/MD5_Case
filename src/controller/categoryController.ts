import {Request, Response} from "express";
import productService from "../service/productService";
import categoryService from "../service/CategoryService";

class CategoryController {
    private productService;
    private categoryService;

    constructor() {
        this.productService = productService;
        this.categoryService = categoryService;
    }

    findAll = async (req: Request, res: Response) => {
        let listProduct = await this.productService.getAll();
        res.render('index', {products: listProduct});
    }

    findAllCategory = async (req: Request, res: Response) => {
        let listCategory = await categoryService.getAllCategory();
        res.status(200).json(listCategory)
    }

}

export default new CategoryController();