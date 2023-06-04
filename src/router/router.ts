import {Router} from "express";
import productRouter from "./productRouter";
import {userRouter} from "./userRouter";
import adminRouter from "./adminRouter";
import categoryRouter from "./categoryRouter";
import orderDetailRouter from "./orderDetailRouter";
import orderRouter from "./orderRouter";

const router = Router();
router.use('/admin', adminRouter)
router.use('/products', productRouter);
router.use('/auth', userRouter);
router.use('/order-detail', orderDetailRouter);
router.use('/category', categoryRouter);
router.use('/order', orderRouter);

export default router;
