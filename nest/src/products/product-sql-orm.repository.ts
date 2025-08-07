
import { ProductDto } from './product.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SqLiteRepository {
    constructor(@InjectRepository(Product) private repo: Repository<Product>) { }

    async findAll() {
        return this.repo.find();
    }

    async findById(id: string) {
        return this.repo.findOneBy({ id });
    }

    async create(id: string, product: ProductDto) {
        const productEntity = this.repo.create(product as Product); // Create a new Product entity
        return this.repo.save(productEntity); // Save to SqLite
    }

    async update(id: string, product: Partial<Product>) {
        await this.repo.update(id, product); // Update the existing product
        return this.findById(id); //
    }

    async remove(id: string) {
        return this.repo.delete(id); // Remove the product by id
    }

}