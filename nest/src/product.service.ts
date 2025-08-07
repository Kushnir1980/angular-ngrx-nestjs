import { Injectable } from '@nestjs/common';
import { ProductDto } from './product.dto';
import { FirebaseRepository } from './firebase.repository';

@Injectable()
export class ProductService {

  constructor(private readonly firebaseRepository: FirebaseRepository) { }

  findAll() {
    return this.firebaseRepository.findAll();
  }

  findById(id: string) {
    return this.firebaseRepository.findById(id);
  }

  saveOrUpdate(product: ProductDto) {
    if (!product.id) {
      const id = crypto.randomUUID();
      const newProduct = { ...product, id };
      return this.firebaseRepository.create(id, newProduct);
    }
    return this.firebaseRepository.update2(product.id, product);
  }
}
