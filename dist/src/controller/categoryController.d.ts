import { Request, Response } from "express";
declare class CategoryController {
    private productService;
    private categoryService;
    constructor();
    findAll: (req: Request, res: Response) => Promise<void>;
    findAllCategory: (req: Request, res: Response) => Promise<void>;
}
declare const _default: CategoryController;
export default _default;
