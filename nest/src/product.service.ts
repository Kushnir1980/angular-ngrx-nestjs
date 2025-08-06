import { Injectable } from '@nestjs/common';
import { ProductDto } from './product.dto';
import { FirebaseRepository } from './firebase.repository';

@Injectable()
export class ProductService {

  constructor(private readonly firebaseRepository: FirebaseRepository) { }

  findAll(): ProductDto[] {
    //return this.firebaseRepository.findAll();
    return [];
  }

  findById(id: string): ProductDto {
    return {} as ProductDto; // Placeholder for fetching a single product
  }

  saveOrUpdate(product: ProductDto): ProductDto {
    if (!product.id) {
      const id = crypto.randomUUID();
      const newProduct = { ...product, id };
    }
    return {} as ProductDto; // Placeholder for fetching a single product
  }
}
