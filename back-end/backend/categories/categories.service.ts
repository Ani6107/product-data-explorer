import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';
import { scrapeCategoryProducts } from '../src/scrape/category-products.scraper';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async getProductsByCategory(
    slug: string,
    page: number,
    limit: number,
  ) {
    console.log('🔥 CategoriesService HIT with slug:', slug);

    const skip = (page - 1) * limit;

    // 1️⃣ Find NAVIGATION (not category)
    const navigation = await this.prisma.navigation.findFirst({
      where: {
        slug: {
          endsWith: slug,
        },
      },
    });

    if (!navigation) {
      throw new NotFoundException('Category not found');
    }

    // 2️⃣ Cache check (last 24h)
    const existing = await this.prisma.product.findMany({
      where: {
        navigationId: navigation.id,
        lastScrapedAt: {
          gt: new Date(Date.now() - 24 * 60 * 60 * 1000),
        },
      },
      skip,
      take: limit,
    });

    if (existing.length > 0) {
      const total = await this.prisma.product.count({
        where: { navigationId: navigation.id },
      });

      const products = await this.prisma.product.findMany({
  where: { navigationId: navigation.id },
  skip,
  take: limit,
  orderBy: { id: 'desc' },
});

      return {
        category: slug,
        page,
        limit,
        total,
        products: existing,
        source: 'cache',
      };
    }

    // 3️⃣ Scrape if cache empty
    const scraped = await scrapeCategoryProducts(navigation.slug);

    for (const item of scraped) {
      console.log('Saving product:', item.title);

      await this.prisma.product.upsert({
        where: { sourceUrl: item.sourceUrl },
        update: {
          title: item.title,
          price: item.price,
          currency: item.currency,
          imageUrl: item.imageUrl,
          lastScrapedAt: new Date(),
          navigationId: navigation.id,
        },
        create: {
          sourceId: item.sourceId,
          title: item.title,
          price: item.price,
          currency: item.currency,
          imageUrl: item.imageUrl,
          sourceUrl: item.sourceUrl,
          lastScrapedAt: new Date(),
          navigationId: navigation.id,
        },
      });
    }

    const total = await this.prisma.product.count({
      where: { navigationId: navigation.id },
    });

    const products = await this.prisma.product.findMany({
      where: { navigationId: navigation.id },
      skip,
      take: limit,
    });

    return {
      category: slug,
      page,
      limit,
      total,
      products,
      source: 'scrape',
    };
  }
}
