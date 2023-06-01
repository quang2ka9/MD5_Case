import {Product} from "../enitity/product";
import {AppDataSource} from "../data-source";


class ProductService {
    private productRepository;

    constructor() {
        this.productRepository = AppDataSource.getRepository(Product)
    }

    getAll = async () => {
        let products = await this.productRepository.find({
            relations: {
                category: true,
            }
        });
        return products;
    }

    add = async (product) => {
        await this.productRepository.save(product);
    }
    remove = async (id) => {
        await this.productRepository
            .createQueryBuilder('Product')
            .delete()
            .from(Product)
            .where("id = :id", {id: id})
            .execute()
    }
    findProductById = async (id) => {
        return await this.productRepository.findOne({
            where: {id: id},
            relations: {category: true}
        })
    }
    editProduct = async (id, product) => {
        return await this.productRepository
            .createQueryBuilder()
            .update(Product)
            .set({
                name: product.name, price: product.price, quantity: product.quantity, image: product.image,
                category: product.category
            })
            .where("id = :id", {id: id})
            .execute()
    }
}

export default new ProductService();