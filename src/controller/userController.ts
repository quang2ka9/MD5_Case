import {Request, Response} from "express";
import userService from "../service/userService";
import orderService from "../service/orderService";
class UserController {
    constructor() {}

    register = async (req:Request,res:Response) => {
        let userCheck = await userService.checkRegister(req.body);
        if(userCheck){
            res.status(400).json('User already existed!')
        }
        else if (!req.body.username || !req.body.password){
            res.status(401).json('Please fill all the information!')
        }
        else {
            await userService.addUser(req.body);
            await orderService.createNewOrder(req.body);
            res.status(201).json('Create User Success!');
        }
    }

    login = async (req: Request, res: Response) => {
        let resultCheck = await userService.checkUser(req.body);
        res.status(200).json(resultCheck);

    }

}

export default new UserController();