import { Injectable } from '@nestjs/common';
import { ProductDto } from './product.dto';
import { FirebaseRepository } from './product-firebase.repository';
import { SqLiteRepository } from './product-sql-orm.repository';
import { randomUUID } from 'crypto';

@Injectable()
export class ProductService {

  constructor(
    private readonly firebaseRepository: FirebaseRepository,
    private readonly sqLiteRepository: SqLiteRepository,
  ) { }

  findAll() {
    return this.firebaseRepository.findAll();
  }

  findById(id: string) {
    return this.firebaseRepository.findById(id);
  }

  saveOrUpdate(product: ProductDto) {
    if (!product.id) {
      const id = randomUUID();
      const newProduct = { ...product, id };

      // Save to SqLite
      this.sqLiteRepository.create(id, newProduct);
      // Save to Firebase
      return this.firebaseRepository.create(id, newProduct);
    }
    return this.firebaseRepository.update(product.id as string, product);
  }

  remove(id: string) {
    return this.firebaseRepository.remove(id);
  }
}
