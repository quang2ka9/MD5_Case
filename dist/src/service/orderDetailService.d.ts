declare class OrderDetailService {
    private orderDetailRepository;
    private productRepository;
    private orderRepository;
    constructor();
    findOrder: () => Promise<any>;
    findOrderDetailByOrderId: (orderId: any) => Promise<any>;
    findOrderDetails: (orderId: any) => Promise<any>;
    addOrderDetail: (orderId: any, product: any) => Promise<void>;
    getPayment: (orderId: any, userId: any) => Promise<any>;
    editOrder: (orderId: any, userId: any) => Promise<void>;
    deleteOrderDetail: (orderId: any) => Promise<void>;
    getHistory: (orderId: any) => Promise<any>;
}
declare const _default: OrderDetailService;
export default _default;
