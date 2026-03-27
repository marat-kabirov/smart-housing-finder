const puppeteer = require('puppeteer');

const CITIES = [
  { name: 'Chemnitz', code: 'l8458' },
  { name: 'Leipzig', code: 'l6389' },
  { name: 'Dresden', code: 'l5765' },
  { name: 'Berlin', code: 'l3331' },
];

const scrapeCity = async (browser, city) => {
  const page = await browser.newPage();
  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36'
  );

  await page.goto(
    `https://www.kleinanzeigen.de/s-wohnung-mieten/${city.name.toLowerCase()}/c203${city.code}`,
    { waitUntil: 'domcontentloaded', timeout: 60000 }
  );

  const listings = await page.evaluate((cityName) => {
    const items = document.querySelectorAll('article.aditem');
    const results = [];

    items.forEach((item) => {
      const titleEl = item.querySelector('.ellipsis');
      const priceEl = item.querySelector('.aditem-main--middle--price-shipping--price');
      const linkEl = item.querySelector('a.ellipsis');

      const title = titleEl ? titleEl.innerText.trim() : null;
      const priceRaw = priceEl ? priceEl.innerText.trim() : '';
      const url = linkEl ? 'https://www.kleinanzeigen.de' + linkEl.getAttribute('href') : null;

      const priceMatch = priceRaw.match(/(\d+[\.,]?\d*)/);
      const price = priceMatch ? parseInt(priceMatch[1].replace(',', '')) : null;

      if (title && url) {
        results.push({ title, price, city: cityName, rooms: null, size_sqm: null, url, source: 'kleinanzeigen' });
      }
    });

    return results;
  }, city.name);

  await page.close();

  return listings.filter(l => {
    const isSearch = l.title.toLowerCase().includes('suche') ||
                     l.title.toLowerCase().includes('gesucht');
    const isBadPrice = l.price !== null && l.price < 50;
    return !isSearch && !isBadPrice;
  });
};

const scrape = async () => {
  const browser = await puppeteer.launch({ headless: true });
  let allListings = [];

for (const city of CITIES) {
    console.log(`Scraping ${city.name}...`);
    try {
      const listings = await scrapeCity(browser, city);
      console.log(`  ${city.name}: ${listings.length} applications`);
      allListings = [...allListings, ...listings];
    } catch (err) {
      console.log(`  ${city.name}: error — ${err.message}`);
    }
  }

  await browser.close();
  console.log(`Total listings found: ${allListings.length}`);
  return allListings;
};

module.exports = { scrape };