"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrapeNavigation = scrapeNavigation;
function normalizeSlug(slug) {
    return slug
        .replace('/collections/', '')
        .replace(/-books$/, '');
}
const crawlee_1 = require("crawlee");
async function scrapeNavigation() {
    const results = [];
    const crawler = new crawlee_1.PlaywrightCrawler({
        maxConcurrency: 1,
        requestHandlerTimeoutSecs: 60,
        async requestHandler({ page }) {
            await page.goto('https://www.worldofbooks.com/', { waitUntil: 'domcontentloaded' });
            const navItems = await page.$$eval('nav a', (links) => links.map((link) => ({
                title: link.textContent?.trim() || '',
                slug: link.getAttribute('href') || '',
            })));
            navItems
                .filter((item) => item.title && item.slug && item.slug.startsWith('/collections'))
                .forEach((item) => results.push({
                title: item.title,
                slug: normalizeSlug(item.slug),
                sourceSlug: item.slug,
            }));
        },
    });
    await crawler.run(['https://www.worldofbooks.com/']);
    return results;
}
//# sourceMappingURL=worldofbooks.scraper.js.map