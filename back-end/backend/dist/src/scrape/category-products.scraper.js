"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrapeCategoryProducts = scrapeCategoryProducts;
const crawlee_1 = require("crawlee");
async function scrapeCategoryProducts(navigationSlug) {
    let url;
    if (navigationSlug.startsWith('http')) {
        url = navigationSlug;
    }
    else if (navigationSlug.startsWith('/')) {
        url = `https://www.worldofbooks.com${navigationSlug}`;
    }
    else {
        url = `https://www.worldofbooks.com/collections/${navigationSlug}`;
    }
    console.log('🌍 Scraping URL:', url);
    const products = [];
    const crawler = new crawlee_1.PlaywrightCrawler({
        requestHandlerTimeoutSecs: 60,
        requestHandler: async ({ page }) => {
            try {
                const acceptBtn = await page.$('button:has-text("Accept")');
                if (acceptBtn) {
                    await acceptBtn.click();
                    await page.waitForTimeout(1000);
                }
            }
            catch {
            }
            for (let i = 0; i < 3; i++) {
                await page.evaluate(() => {
                    window.scrollTo(0, document.body.scrollHeight);
                });
                await page.waitForTimeout(2000);
            }
            await page.waitForSelector('a[href*="/products/"]', {
                timeout: 20000,
            });
            const items = await page.$$('a[href*="/products/"]');
            console.log('🔍 Product links found:', items.length);
            for (const item of items) {
                try {
                    const sourceUrl = await item.getAttribute('href');
                    if (!sourceUrl)
                        continue;
                    const fullSourceUrl = sourceUrl.startsWith('http')
                        ? sourceUrl
                        : `https://www.worldofbooks.com${sourceUrl}`;
                    const title = (await item.textContent())?.trim() ?? 'Untitled';
                    const imageUrl = await item
                        .$eval('img', el => {
                        const img = el;
                        const style = window.getComputedStyle(el);
                        const bg = style.backgroundImage;
                        if (!bg || bg === 'none')
                            return null;
                        return bg.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
                    })
                        .catch(() => null);
                    const priceText = await item.evaluate(el => {
                        const priceEl = el.closest('a[href*="/price/"]') ||
                            el.parentElement;
                        return priceEl?.textContent || '';
                    });
                    const price = Number(priceText.replace(/[^\d.]/g, '')) || 0;
                    products.push({
                        sourceId: fullSourceUrl,
                        title,
                        price,
                        currency: 'GBP',
                        imageUrl,
                        sourceUrl: fullSourceUrl,
                    });
                }
                catch (err) {
                    continue;
                }
            }
        },
    });
    await crawler.run([url]);
    console.log('✅ Products scraped:', products.length);
    return products;
}
//# sourceMappingURL=category-products.scraper.js.map