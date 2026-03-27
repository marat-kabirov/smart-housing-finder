require('dotenv').config();
const { runScraper } = require('./src/scraper/index');

runScraper()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });