import { Request, Response } from "express";
declare class OrderDetailController {
    constructor();
    getPayment: (req: Request, res: Response) => Promise<void>;
    deleteOrderDetail: (req: Request, res: Response) => Promise<void>;
    getHistory: (req: Request, res: Response) => Promise<void>;
    getOrderDetails: (req: Request, res: Response) => Promise<void>;
}
declare const _default: OrderDetailController;
export default _default;
