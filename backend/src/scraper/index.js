const { scrape } = require('./kleinanzeigen');
const { insertMany } = require('../models/listing');

const runScraper = async () => {
  console.log('Start scraper...');
  const listings = await scrape();
  await insertMany(listings);
  console.log('Finished! Saved to database:', listings.length);
};

module.exports = { runScraper };