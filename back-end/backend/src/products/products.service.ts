import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async getProductById(id: number) {
    if (!id || isNaN(id)) {
      throw new NotFoundException('Invalid product id');
    }

    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        detail: true,
        reviews: true,
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }
}
