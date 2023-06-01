import { Router } from "express";
import categoryController from "../controller/categoryController";

const categoryRouter = Router();

categoryRouter.get('/', categoryController.findAllCategory)

export default categoryRouter;