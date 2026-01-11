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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavigationController = void 0;
const common_1 = require("@nestjs/common");
const scrape_service_1 = require("../scrape/scrape.service");
const categories_service_1 = require("../../categories/categories.service");
let NavigationController = class NavigationController {
    scrapeService;
    categoriesService;
    constructor(scrapeService, categoriesService) {
        this.scrapeService = scrapeService;
        this.categoriesService = categoriesService;
    }
    async getNavigation() {
        return this.scrapeService.getNavigation();
    }
    async getProductsByNavigation(slug, page = '1', limit = '20') {
        return this.categoriesService.getProductsByCategory(slug, Number(page), Number(limit));
    }
};
exports.NavigationController = NavigationController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NavigationController.prototype, "getNavigation", null);
__decorate([
    (0, common_1.Get)(':slug/products'),
    __param(0, (0, common_1.Param)('slug')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], NavigationController.prototype, "getProductsByNavigation", null);
exports.NavigationController = NavigationController = __decorate([
    (0, common_1.Controller)('navigation'),
    __metadata("design:paramtypes", [scrape_service_1.ScrapeService,
        categories_service_1.CategoriesService])
], NavigationController);
//# sourceMappingURL=navigation.controller.js.map