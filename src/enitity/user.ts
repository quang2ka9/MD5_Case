import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Order} from "./order";
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    username: string;
    @Column()
    password: string;
    @Column({default:'user'})
    role: string;
    @OneToMany(() => Order,(order) => order.user)
    orders: Order[];

}