declare class ProductService {
    private productRepository;
    constructor();
    getAll: (page: any, pageSize: any) => Promise<{
        products: any;
        totalPages: number;
    }>;
    add: (product: any) => Promise<void>;
    remove: (id: any) => Promise<void>;
    findProductById: (id: any) => Promise<any>;
    editProduct: (id: any, product: any) => Promise<any>;
    findByNameProduct: (name: any) => Promise<any>;
    findByCategoryId: (categoryId: any) => Promise<any>;
    findByPrice: (min: any, max: any) => Promise<any>;
}
declare const _default: ProductService;
export default _default;
