const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://www.kleinanzeigen.de/s-wohnung-mieten/chemnitz/c203l8458');
  const title = await page.title();
  console.log('Page title:', title);
  await browser.close();
})();