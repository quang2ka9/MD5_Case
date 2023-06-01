import {Router} from "express";
import {auth} from "../middleware/auth";
import {adminAuth} from "../middleware/adminAuth";
import adminController from "../controller/adminController";



const adminRouter = Router();

adminRouter.use(auth);
adminRouter.use(adminAuth);
adminRouter.get('/alluser', adminController.showAllAcount);
adminRouter.put('/rerole', adminController.reRole);

export default adminRouter;