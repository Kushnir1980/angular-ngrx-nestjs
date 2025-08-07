
import { ProductDto } from './product.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SqLiteRepository {
    constructor(@InjectRepository(Product) private repo: Repository<Product>) { }

    async findAll() {

    }

    async findById(id: string) {

    }

    async create(id: string, product: ProductDto) {
        const productEntity = this.repo.create({ ...product } as Product); // Create a new Product entity
        this.repo.save(productEntity); // Save to SqLite
    }

    async update(id: string, product: ProductDto) {

    }

    async remove(id: string) {

    }

}