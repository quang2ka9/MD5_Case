import { Category } from './category';
import { OrderDetail } from "./orderDetail";
export declare class Product {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
    category: Category;
    orderDetails: OrderDetail[];
}
