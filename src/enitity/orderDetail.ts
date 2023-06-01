import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Order} from "./order";
import {Product} from "./product";

@Entity()
export class OrderDetail {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ default: 0 })
    price: number;
    @Column({ default: 0 })
    quantity: number;
    @Column({ default: 0 })
    totalPrice: number;
    @ManyToOne(() => Order,(order) => order.orderDetails)
    order: Order;
    @ManyToOne(() => Product,(product) => product.orderDetails)
    product: Product;
}