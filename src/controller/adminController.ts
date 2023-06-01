import {Request, Response} from "express";
import productService from "../service/productService";
import adminService from "../service/adminService";
class AdminController {


    constructor() {}

    showAllAcount = async (req:Request,res:Response) => {
        let allAccount = await adminService.getAllAccount();
        res.status(200).json(allAccount)
    }

    reRole = async (req: Request, res: Response) => {
        let username = req.body.username;
        let resultReRole = await adminService.reRole(username);
        if (resultReRole)
        res.status(200).json({
            message: 'Edit success'
        })
        else res.status(301).json({
            message: 'Edit fail'
        })
    }


}

export default new AdminController();