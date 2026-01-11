import { Controller, Get, Param, Query } from '@nestjs/common';
import { ScrapeService } from '../scrape/scrape.service';
import { CategoriesService } from '../../categories/categories.service';

@Controller('navigation')
export class NavigationController {
  constructor(
    private readonly scrapeService: ScrapeService,
    private readonly categoriesService: CategoriesService,
  ) {}

  // ✅ THIS IS REQUIRED
  @Get()
  async getNavigation() {
    return this.scrapeService.getNavigation();
  }

  // ✅ Products via navigation slug
  @Get(':slug/products')
  async getProductsByNavigation(
    @Param('slug') slug: string,
    @Query('page') page = '1',
    @Query('limit') limit = '20',
  ) {
    return this.categoriesService.getProductsByCategory(
      slug,
      Number(page),
      Number(limit),
    );
  }
}
