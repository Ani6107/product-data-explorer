"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../src/prisma/prisma.service");
const category_products_scraper_1 = require("../src/scrape/category-products.scraper");
let CategoriesService = class CategoriesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getProductsByCategory(slug, page, limit) {
        console.log('🔥 CategoriesService HIT with slug:', slug);
        const skip = (page - 1) * limit;
        const navigation = await this.prisma.navigation.findFirst({
            where: {
                slug: {
                    endsWith: slug,
                },
            },
        });
        if (!navigation) {
            throw new common_1.NotFoundException('Category not found');
        }
        const existing = await this.prisma.product.findMany({
            where: {
                navigationId: navigation.id,
                lastScrapedAt: {
                    gt: new Date(Date.now() - 24 * 60 * 60 * 1000),
                },
            },
            skip,
            take: limit,
        });
        if (existing.length > 0) {
            const total = await this.prisma.product.count({
                where: { navigationId: navigation.id },
            });
            const products = await this.prisma.product.findMany({
                where: { navigationId: navigation.id },
                skip,
                take: limit,
                orderBy: { id: 'desc' },
            });
            return {
                category: slug,
                page,
                limit,
                total,
                products: existing,
                source: 'cache',
            };
        }
        const scraped = await (0, category_products_scraper_1.scrapeCategoryProducts)(navigation.slug);
        for (const item of scraped) {
            console.log('Saving product:', item.title);
            await this.prisma.product.upsert({
                where: { sourceUrl: item.sourceUrl },
                update: {
                    title: item.title,
                    price: item.price,
                    currency: item.currency,
                    imageUrl: item.imageUrl,
                    lastScrapedAt: new Date(),
                    navigationId: navigation.id,
                },
                create: {
                    sourceId: item.sourceId,
                    title: item.title,
                    price: item.price,
                    currency: item.currency,
                    imageUrl: item.imageUrl,
                    sourceUrl: item.sourceUrl,
                    lastScrapedAt: new Date(),
                    navigationId: navigation.id,
                },
            });
        }
        const total = await this.prisma.product.count({
            where: { navigationId: navigation.id },
        });
        const products = await this.prisma.product.findMany({
            where: { navigationId: navigation.id },
            skip,
            take: limit,
        });
        return {
            category: slug,
            page,
            limit,
            total,
            products,
            source: 'scrape',
        };
    }
};
exports.CategoriesService = CategoriesService;
exports.CategoriesService = CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CategoriesService);
//# sourceMappingURL=categories.service.js.map