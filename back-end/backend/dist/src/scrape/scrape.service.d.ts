import { PrismaService } from '../prisma/prisma.service';
export declare class ScrapeService {
    private prisma;
    constructor(prisma: PrismaService);
    getNavigation(): Promise<{
        id: number;
        title: string;
        slug: string;
        lastScrapedAt: Date | null;
        createdAt: Date;
    }[]>;
}
