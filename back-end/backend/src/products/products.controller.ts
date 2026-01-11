import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get(':id')
  getProduct(@Param('id', ParseIntPipe) id: number) {
    console.log('🆔 Product ID received:', id);
    return this.productsService.getProductById(id);
  }
}
