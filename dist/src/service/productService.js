"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../enitity/product");
const data_source_1 = require("../data-source");
const typeorm_1 = require("typeorm");
class ProductService {
    constructor() {
        this.getAll = async (page, pageSize) => {
            const skip = (page - 1) * pageSize;
            const take = pageSize;
            const [products, total] = await this.productRepository.findAndCount({
                relations: {
                    category: true,
                },
                skip,
                take,
            });
            const totalPages = Math.ceil(total / pageSize);
            return {
                products,
                totalPages,
            };
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
        this.findByNameProduct = async (name) => {
            let products = await this.productRepository.find({
                relations: {
                    category: true,
                },
                where: {
                    name: (0, typeorm_1.Like)(`%${name}%`),
                },
            });
            if (!products) {
                return "product is not exist";
            }
            return products;
        };
        this.findByCategoryId = async (categoryId) => {
            const products = await this.productRepository.find({
                where: {
                    category: { id: categoryId },
                },
                relations: ["category"],
            });
            return products;
        };
        this.findByPrice = async (min, max) => {
            let a = '';
            if (!min && !max) {
                a = '';
            }
            else {
                a = `where p.price >=${min} and p.price <= ${max}`;
            }
            if (!min) {
                a = `where p.price <= ${max}`;
            }
            if (!max) {
                a = `where p.price >= ${min}`;
            }
            let sql = `select p.id, p.name, p.price, p.quantity, p.image, c.name as nameCategory from product_category pc join product p on pc.idProduct = p.id join category c on pc.idCategory = c.id ${a}`;
            let product = await this.productRepository.query(sql);
            if (!product) {
                return "Can not find by name";
            }
            return product;
        };
        this.productRepository = data_source_1.AppDataSource.getRepository(product_1.Product);
    }
}
exports.default = new ProductService();
//# sourceMappingURL=productService.js.map