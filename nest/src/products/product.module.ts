import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { FirebaseRepository } from './product-firebase.repository';
import { Product } from './product.entity';
import { SqLiteRepository } from './product-sql-orm.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductController],
  providers: [ProductService, FirebaseRepository, SqLiteRepository],
})
export class ProductModule { }
