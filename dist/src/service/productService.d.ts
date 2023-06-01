declare class ProductService {
    private productRepository;
    constructor();
    getAll: () => Promise<any>;
    add: (product: any) => Promise<void>;
    remove: (id: any) => Promise<void>;
    findProductById: (id: any) => Promise<any>;
    editProduct: (id: any, product: any) => Promise<any>;
}
declare const _default: ProductService;
export default _default;
