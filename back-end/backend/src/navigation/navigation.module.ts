import { Module } from '@nestjs/common';
import { NavigationController } from './navigation.controller';
import { NavigationService } from './navigation.service';
import { PrismaModule } from '../prisma/prisma.module';
import { CategoriesModule } from '../../categories/categories.module';
import { ScrapeModule } from '../scrape/scrape.module';


@Module({
  imports: [PrismaModule, CategoriesModule, ScrapeModule],
  controllers: [NavigationController],
  providers: [NavigationService],
})
export class NavigationModule {}
