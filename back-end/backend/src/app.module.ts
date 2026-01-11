import { Module } from '@nestjs/common';
import { CategoriesModule } from '../categories/categories.module';
import { NavigationModule } from './navigation/navigation.module';
import { PrismaModule } from './prisma/prisma.module';
import { ScrapeModule } from './scrape/scrape.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    PrismaModule,
    ScrapeModule,
    NavigationModule,
    CategoriesModule,
    ProductsModule,
  ],
})
export class AppModule {}
