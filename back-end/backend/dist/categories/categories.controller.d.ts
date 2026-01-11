import { CategoriesService } from './categories.service';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    getProductsByCategory(slug: string, page?: string, limit?: string): Promise<{
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
