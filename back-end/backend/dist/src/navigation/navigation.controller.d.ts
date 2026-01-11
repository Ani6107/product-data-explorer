import { ScrapeService } from '../scrape/scrape.service';
import { CategoriesService } from '../../categories/categories.service';
export declare class NavigationController {
    private readonly scrapeService;
    private readonly categoriesService;
    constructor(scrapeService: ScrapeService, categoriesService: CategoriesService);
    getNavigation(): Promise<{
        id: number;
        title: string;
        slug: string;
        lastScrapedAt: Date | null;
        createdAt: Date;
    }[]>;
    getProductsByNavigation(slug: string, page?: string, limit?: string): Promise<{
        category: string;
        page: number;
        limit: number;
        total: number;
        products: {
            id: number;
            sourceId: string;
            title: string;
            author: string | null;
            price: number;
            currency: string;
            imageUrl: string | null;
            sourceUrl: string;
            lastScrapedAt: Date | null;
            createdAt: Date;
            navigationId: number;
        }[];
        source: string;
    }>;
}
