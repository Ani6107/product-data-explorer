import { Module } from '@nestjs/common';
import { ScrapeService } from '../scrape/scrape.service';

@Module({
  providers: [ScrapeService],
  exports: [ScrapeService],
})
export class ScrapeModule {}
