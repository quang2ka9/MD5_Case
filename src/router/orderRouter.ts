import { Router } from "express";
import orderController from "../controller/orderController";
import {auth} from "../middleware/auth";
import orderDetailRouter from "./orderDetailRouter";



const orderRouter = Router();
orderDetailRouter.use(auth);

orderRouter.get('/bill/:id',orderController.findOrderUserId)


export default orderRouter;