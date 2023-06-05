declare class ProductService {
    private productRepository;
    private orderDetailRepository;
    constructor();
    getAll: (page: any, pageSize: any, getTotalCount?: boolean) => Promise<{
        products: any;
        totalCount: any;
        totalPages: number;
    } | {
        products: any;
        totalPages: number;
        totalCount?: undefined;
    }>;
    topFiveProducts: () => Promise<any>;
    add: (product: any) => Promise<void>;
    remove: (id: any) => Promise<void>;
    findProductById: (id: any) => Promise<any>;
    editProduct: (id: any, product: any) => Promise<any>;
    findByNameProduct: (name: any, page?: number, perPage?: number) => Promise<"product is not exist" | {
        products: any;
        totalCount: any;
        totalPages: number;
        currentPage: number;
        perPage: number;
    }>;
    findByCategoryId: (categoryId: any, page: any, pageSize: any) => Promise<{
        products: any;
        totalCount: any;
        totalPages: number;
    }>;
    findByPrice: (min: any, max: any) => Promise<any>;
}
declare const _default: ProductService;
export default _default;
