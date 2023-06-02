import {Router} from "express";
import productController from "../controller/productController";
import {auth} from "../middleware/auth";
import {adminAuth} from "../middleware/adminAuth";
import {userAuth} from "../middleware/userAuth";




const productRouter = Router();

productRouter.get('/', productController.findAll);
productRouter.get('/categories/:categoryId', productController.findByCategoryId);
productRouter.get('/price', productController.findByPrice)
productRouter.get('/name', productController.findByNameProduct)
productRouter.use(auth);
productRouter.post('/', adminAuth, productController.addProduct);
productRouter.delete('/:id', adminAuth, productController.remove);
productRouter.put('/:id',adminAuth, productController.editProduct);
productRouter.get('/:id', userAuth, productController.findProductById);






export default productRouter;