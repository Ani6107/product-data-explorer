import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { scrapeNavigation } from './worldofbooks.scraper';

@Injectable()
export class ScrapeService {
  constructor(private prisma: PrismaService) {}

  async getNavigation() {
    const existing = await this.prisma.navigation.findMany();
    const TTL_HOURS = 24;

if (existing.length > 0) {
  const lastScraped = existing[0].lastScrapedAt;

  const isFresh =
    lastScraped &&
    Date.now() - new Date(lastScraped).getTime() <
      TTL_HOURS * 60 * 60 * 1000;

  if (isFresh) {
    return existing;
  }
}

    if (existing.length > 0) {
      return existing;
    }

    const scraped = await scrapeNavigation();

    for (const item of scraped) {
      await this.prisma.navigation.upsert({
        where: { slug: item.slug },
        update: { title: item.title, lastScrapedAt: new Date() },
        create: {
          title: item.title,
          slug: item.slug,
          lastScrapedAt: new Date(),
        },
      });
    }

    return this.prisma.navigation.findMany({
  orderBy: { title: 'asc' },
});
  }
}
