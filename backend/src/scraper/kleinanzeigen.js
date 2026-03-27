const puppeteer = require('puppeteer');

const scrape = async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36'
  );

  await page.goto(
    'https://www.kleinanzeigen.de/s-wohnung-mieten/chemnitz/c203l8458',
    { waitUntil: 'networkidle2', timeout: 30000 }
  );

  const listings = await page.evaluate(() => {
    const items = document.querySelectorAll('article.aditem');
    const results = [];

    items.forEach((item) => {
      const titleEl = item.querySelector('.ellipsis');
      const priceEl = item.querySelector('.aditem-main--middle--price-shipping--price');
      const linkEl = item.querySelector('a.ellipsis');

      const title = titleEl ? titleEl.innerText.trim() : null;
      const priceRaw = priceEl ? priceEl.innerText.trim() : '';
      const url = linkEl ? 'https://www.kleinanzeigen.de' + linkEl.getAttribute('href') : null;

      // парсим цену: "550 €" → 550
      const priceMatch = priceRaw.match(/(\d+[\.,]?\d*)/);
      const price = priceMatch ? parseInt(priceMatch[1].replace(',', '')) : null;

      const isSearch = title.toLowerCase().includes('suche') || 
                 title.toLowerCase().includes('gesucht');
      const isBadPrice = price !== null && price < 50;

      if (title && url && !isSearch && !isBadPrice) {
        results.push({
          title,
          price,
          city: 'Chemnitz',
          rooms: null,
          size_sqm: null,
          url,
          source: 'kleinanzeigen',
        });
      }
    });

    return results;
  });

  await browser.close();
  console.log(`Kleinanzeigen: ${listings.length}`);
  return listings;
};

module.exports = { scrape };