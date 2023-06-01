declare class OrderService {
    private orderRepository;
    constructor();
    createNewOrder: (user: any) => Promise<any>;
    findOrderByUserId: (userId: any) => Promise<any>;
    findAllOrderByUserId: (userId: any) => Promise<any>;
}
declare const _default: OrderService;
export default _default;
