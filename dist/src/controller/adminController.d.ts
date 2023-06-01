import { Request, Response } from "express";
declare class AdminController {
    constructor();
    showAllAcount: (req: Request, res: Response) => Promise<void>;
    reRole: (req: Request, res: Response) => Promise<void>;
}
declare const _default: AdminController;
export default _default;
