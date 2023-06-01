declare class CategoryService {
    private categoryRepository;
    constructor();
    getAll: () => Promise<any>;
    getAllCategory: () => Promise<any>;
}
declare const _default: CategoryService;
export default _default;
