import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './product.dto';

@Controller('/api/products')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Get()
  listProducts() {
    return this.productService.findAll();
  }

  @Post()
  createProduct(@Body() body: ProductDto) {
    return this.productService.saveOrUpdate(body)
  }

  @Get('/:id')
  getProduct(@Param('id') id: string) {
    return this.productService.findById(id);
  }

  @Delete('/:id')
  deleteProduct(@Param('id') id: string) {
    return this.productService.remove(id);
  }

}
