import { PrismaService } from '../src/prisma/prisma.service';
export declare class CategoriesService {
    private prisma;
    constructor(prisma: PrismaService);
    getProductsByCategory(slug: string, page: number, limit: number): Promise<{
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
