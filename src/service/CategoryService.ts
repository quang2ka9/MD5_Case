import {Category} from "../enitity/category";
import {AppDataSource} from "../data-source";

class CategoryService {
    private categoryRepository;

    constructor() {
        this.categoryRepository = AppDataSource.getRepository(Category);
    }

    getAll = async () => {
        let categories = await this.categoryRepository.find();
        return categories;
    }

    getAllCategory = async () => {
        let products = await this.categoryRepository.find();
        return products;
    }

}

export default new CategoryService();