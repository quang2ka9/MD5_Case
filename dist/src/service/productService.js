"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../enitity/product");
const data_source_1 = require("../data-source");
class ProductService {
    constructor() {
        this.getAll = async () => {
            let products = await this.productRepository.find({
                relations: {
                    category: true,
                }
            });
            return products;
        };
        this.add = async (product) => {
            await this.productRepository.save(product);
        };
        this.remove = async (id) => {
            await this.productRepository
                .createQueryBuilder('Product')
                .delete()
                .from(product_1.Product)
                .where("id = :id", { id: id })
                .execute();
        };
        this.findProductById = async (id) => {
            return await this.productRepository.findOne({
                where: { id: id },
                relations: { category: true }
            });
        };
        this.editProduct = async (id, product) => {
            return await this.productRepository
                .createQueryBuilder()
                .update(product_1.Product)
                .set({
                name: product.name, price: product.price, quantity: product.quantity, image: product.image,
                category: product.category
            })
                .where("id = :id", { id: id })
                .execute();
        };
        this.productRepository = data_source_1.AppDataSource.getRepository(product_1.Product);
    }
}
exports.default = new ProductService();
//# sourceMappingURL=productService.js.map