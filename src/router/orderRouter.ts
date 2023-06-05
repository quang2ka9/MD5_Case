import { Router } from "express";
import orderController from "../controller/orderController";
import {auth} from "../middleware/auth";
import orderDetailRouter from "./orderDetailRouter";
import {userAuth} from "../middleware/userAuth";



const orderRouter = Router();
orderDetailRouter.use(auth);
orderDetailRouter.use(userAuth);
orderRouter.get('/bill',orderController.findOrderUserId)


export default orderRouter;