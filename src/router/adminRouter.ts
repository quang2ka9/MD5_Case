import {Router} from "express";
import {auth} from "../middleware/auth";
import {adminAuth} from "../middleware/adminAuth";
import adminController from "../controller/adminController";



const adminRouter = Router();

adminRouter.use(auth);
adminRouter.use(adminAuth);
adminRouter.get('/show', adminController.showAllAcount);
adminRouter.put('/role', adminController.reRole);

export default adminRouter;