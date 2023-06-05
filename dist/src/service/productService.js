"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../enitity/product");
const data_source_1 = require("../data-source");
const typeorm_1 = require("typeorm");
const orderDetail_1 = require("../enitity/orderDetail");
class ProductService {
    constructor() {
        this.getAll = async (page, pageSize, getTotalCount = false) => {
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
            if (getTotalCount) {
                return {
                    products,
                    totalCount: total,
                    totalPages,
                };
            }
            else {
                return {
                    products,
                    totalPages,
                };
            }
        };
        this.topFiveProducts = async () => {
            let excel = await this.productRepository
                .createQueryBuilder('product')
                .orderBy('product.price', 'DESC')
                .take(5)
                .getMany();
            return excel;
        };
        this.add = async (product) => {
            await this.productRepository.save(product);
        };
        this.remove = async (id) => {
            let products = await this.orderDetailRepository.find({
                where: {
                    product: {
                        id: id
                    }
                }
            });
            if (products) {
                await this.orderDetailRepository
                    .createQueryBuilder('OrderDetail')
                    .delete()
                    .from(orderDetail_1.OrderDetail)
                    .where({ product: id })
                    .execute();
                await this.productRepository
                    .createQueryBuilder('Product')
                    .delete()
                    .from(product_1.Product)
                    .where({ id: id })
                    .execute();
            }
            else {
                await this.productRepository
                    .createQueryBuilder('Product')
                    .delete()
                    .from(product_1.Product)
                    .where({ id: id })
                    .execute();
            }
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
        this.findByNameProduct = async (name, page = 1, perPage = 10) => {
            const skip = (page - 1) * perPage;
            const take = perPage;
            const [products, totalCount] = await this.productRepository.findAndCount({
                relations: {
                    category: true,
                },
                where: {
                    name: (0, typeorm_1.Like)(`%${name}%`),
                },
                skip,
                take
            });
            if (totalCount === 0) {
                return "product is not exist";
            }
            const totalPages = Math.ceil(totalCount / perPage);
            return {
                products,
                totalCount,
                totalPages,
                currentPage: page,
                perPage
            };
        };
        this.findByCategoryId = async (categoryId, page, pageSize) => {
            const skip = (page - 1) * pageSize;
            const take = pageSize;
            const [products, total] = await this.productRepository.findAndCount({
                where: {
                    category: { id: categoryId },
                },
                relations: {
                    category: true,
                },
                skip,
                take,
            });
            const totalPages = Math.ceil(total / pageSize);
            return {
                products,
                totalCount: total,
                totalPages,
            };
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
        this.orderDetailRepository = data_source_1.AppDataSource.getRepository(orderDetail_1.OrderDetail);
    }
}
exports.default = new ProductService();
//# sourceMappingURL=productService.js.map