import { ProductsService } from './products.service';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    getProduct(id: number): Promise<{
        detail: {
            id: number;
            description: string | null;
            specs: import("@prisma/client").Prisma.JsonValue | null;
            ratingsAvg: number | null;
            reviewsCount: number | null;
            createdAt: Date;
            productId: number;
        } | null;
        reviews: {
            id: number;
            author: string | null;
            rating: number | null;
            text: string | null;
            createdAt: Date;
            productId: number;
        }[];
    } & {
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
    }>;
}
