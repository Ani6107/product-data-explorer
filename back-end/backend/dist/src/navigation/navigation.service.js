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
exports.NavigationService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const category_products_scraper_1 = require("../scrape/category-products.scraper");
let NavigationService = class NavigationService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getNavigation() {
        return this.prisma.navigation.findMany();
    }
    async getProductsByNavigation(slug, page, limit) {
        const navigation = await this.prisma.navigation.findFirst({
            where: {
                slug: {
                    endsWith: slug,
                },
            },
        });
        if (!navigation) {
            throw new common_1.NotFoundException('Navigation not found');
        }
        const products = await (0, category_products_scraper_1.scrapeCategoryProducts)(navigation.slug);
        return {
            navigation: navigation.title,
            slug,
            page,
            limit,
            products,
            source: 'scrape',
        };
    }
};
exports.NavigationService = NavigationService;
exports.NavigationService = NavigationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], NavigationService);
//# sourceMappingURL=navigation.service.js.map