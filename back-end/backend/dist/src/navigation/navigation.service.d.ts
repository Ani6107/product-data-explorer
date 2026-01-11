import { PrismaService } from '../prisma/prisma.service';
export declare class NavigationService {
    private prisma;
    constructor(prisma: PrismaService);
    getNavigation(): Promise<{
        id: number;
        title: string;
        slug: string;
        lastScrapedAt: Date | null;
        createdAt: Date;
    }[]>;
    getProductsByNavigation(slug: string, page: number, limit: number): Promise<{
        navigation: string;
        slug: string;
        page: number;
        limit: number;
        products: any[];
        source: string;
    }>;
}
