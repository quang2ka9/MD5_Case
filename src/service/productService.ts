import {Product} from "../enitity/product";
import {AppDataSource} from "../data-source";
import {Like} from "typeorm";


class ProductService {
    private productRepository;

    constructor() {
        this.productRepository = AppDataSource.getRepository(Product)
    }

    // getAll = async () => {
    //     let products = await this.productRepository.find({
    //         relations: {
    //             category: true,
    //         }
    //     });
    //     return products;
    // }

    getAll = async (page, pageSize) => {
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


    findByNameProduct = async (name)=> {
        let products = await this.productRepository.find({
            relations: {
                category: true,
            },
            where: {
                    name: Like(`%${name}%`),
                },
        })
        if(!products){
            return "product is not exist";
        }
        return products;
    }

    findByCategoryId = async (categoryId) => {
        const products = await this.productRepository.find({
            where: {
                category: { id: categoryId },
            },
            relations: ["category"],
        });
        return products;
    }

    findByPrice = async (min,max)=> {
        let a = '';

        if(!min && !max){
            a=''
        }else {
            a = `where p.price >=${min} and p.price <= ${max}`;
        }
        if(!min){
            a = `where p.price <= ${max}`;
        }
        if(!max){
            a = `where p.price >= ${min}`;
        }
        let sql =`select p.id, p.name, p.price, p.quantity, p.image, c.name as nameCategory from product_category pc join product p on pc.idProduct = p.id join category c on pc.idCategory = c.id ${a}`;
        let product = await this.productRepository.query(sql);
        if(!product){
            return "Can not find by name";
        }
        return product;
    }
}

export default new ProductService();