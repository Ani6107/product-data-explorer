function normalizeSlug(slug: string) {
  return slug
    .replace('/collections/', '')
    .replace(/-books$/, '');
}
import { PlaywrightCrawler } from 'crawlee';

export async function scrapeNavigation(): Promise<{ title: string; slug: string }[]> {

type NavigationItem = {
  title: string;
  slug: string;
  sourceSlug: string;
};

const results: NavigationItem[] = [];
  const crawler = new PlaywrightCrawler({
    maxConcurrency: 1,
    requestHandlerTimeoutSecs: 60,
    async requestHandler({ page }) {
      await page.goto('https://www.worldofbooks.com/', {waitUntil: 'domcontentloaded'});

      const navItems = await page.$$eval('nav a', (links) =>
        links.map((link) => ({
          title: link.textContent?.trim() || '',
          slug: link.getAttribute('href') || '',
        })),
      );

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
