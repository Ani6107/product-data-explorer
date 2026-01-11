import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { scrapeCategoryProducts } from '../scrape/category-products.scraper';

@Injectable()
export class NavigationService {
  constructor(private prisma: PrismaService) {}

  async getNavigation() {
  try {
    const navigation = await this.prisma.navigation.findMany({
      orderBy: { id: 'asc' },
    });

    return navigation ?? [];
  } catch (error) {
    console.error('❌ Navigation fetch failed:', error);
    return [];
  }
}


  async getProductsByNavigation(
    slug: string,
    page: number,
    limit: number,
  ) {
    const navigation = await this.prisma.navigation.findFirst({
      where: {
        slug: {
          endsWith: slug,
        },
      },
    });

    if (!navigation) {
      throw new NotFoundException('Navigation not found');
    }

    const products = await scrapeCategoryProducts(navigation.slug);

    return {
      navigation: navigation.title,
      slug,
      page,
      limit,
      products,
      source: 'scrape',
    };
  }
}

