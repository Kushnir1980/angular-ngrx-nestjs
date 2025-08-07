import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm'

@Entity()
export class Product {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column('decimal')
    price: number;

    @Column({ nullable: true })
    description: string;
}