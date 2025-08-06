import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './product.dto';

@Controller('/api/products')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Get()
  listProducts(): ProductDto[] {
    return this.productService.findAll();
  }

  @Post()
  createProduct(@Body() body: ProductDto): ProductDto {
    return {} as ProductDto; // Placeholder for product creation logic
  }

  @Get('/:id')
  getProduct(@Param('id') id: string): ProductDto {
    return {} as ProductDto; // Placeholder for fetching a single product
  }
}
