import { Order } from "./order";
import { Product } from "./product";
export declare class OrderDetail {
    id: number;
    price: number;
    quantity: number;
    totalPrice: number;
    order: Order;
    product: Product;
}
