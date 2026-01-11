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
exports.ScrapeService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const worldofbooks_scraper_1 = require("./worldofbooks.scraper");
let ScrapeService = class ScrapeService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getNavigation() {
        const existing = await this.prisma.navigation.findMany();
        const TTL_HOURS = 24;
        if (existing.length > 0) {
            const lastScraped = existing[0].lastScrapedAt;
            const isFresh = lastScraped &&
                Date.now() - new Date(lastScraped).getTime() <
                    TTL_HOURS * 60 * 60 * 1000;
            if (isFresh) {
                return existing;
            }
        }
        if (existing.length > 0) {
            return existing;
        }
        const scraped = await (0, worldofbooks_scraper_1.scrapeNavigation)();
        for (const item of scraped) {
            await this.prisma.navigation.upsert({
                where: { slug: item.slug },
                update: { title: item.title, lastScrapedAt: new Date() },
                create: {
                    title: item.title,
                    slug: item.slug,
                    lastScrapedAt: new Date(),
                },
            });
        }
        return this.prisma.navigation.findMany({
            orderBy: { title: 'asc' },
        });
    }
};
exports.ScrapeService = ScrapeService;
exports.ScrapeService = ScrapeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ScrapeService);
//# sourceMappingURL=scrape.service.js.map