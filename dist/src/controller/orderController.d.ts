import { Request, Response } from "express";
declare class OrderController {
    private orderService;
    constructor();
    findOrderUserId: (req: Request, res: Response) => Promise<void>;
}
declare const _default: OrderController;
export default _default;
