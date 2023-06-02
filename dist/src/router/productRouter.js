"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productController_1 = __importDefault(require("../controller/productController"));
const auth_1 = require("../middleware/auth");
const adminAuth_1 = require("../middleware/adminAuth");
const userAuth_1 = require("../middleware/userAuth");
const productRouter = (0, express_1.Router)();
productRouter.get('/', productController_1.default.findAll);
productRouter.get('/categories/:categoryId', productController_1.default.findByCategoryId);
productRouter.get('/price', productController_1.default.findByPrice);
productRouter.get('/name', productController_1.default.findByNameProduct);
productRouter.use(auth_1.auth);
productRouter.post('/', adminAuth_1.adminAuth, productController_1.default.addProduct);
productRouter.delete('/:id', adminAuth_1.adminAuth, productController_1.default.remove);
productRouter.put('/:id', adminAuth_1.adminAuth, productController_1.default.editProduct);
productRouter.get('/:id', userAuth_1.userAuth, productController_1.default.findProductById);
exports.default = productRouter;
//# sourceMappingURL=productRouter.js.map