import { OrderDetail } from "./orderDetail";
import { User } from "./user";
export declare class Order {
    id: number;
    status: string;
    totalMoney: number;
    date: Date;
    orderDetails: OrderDetail[];
    user: User;
}
