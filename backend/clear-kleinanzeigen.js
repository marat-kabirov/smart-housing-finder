require('dotenv').config();
const pool = require('./src/config/db');

pool.query("DELETE FROM listings WHERE source = 'kleinanzeigen'")
  .then(() => { console.log('Cleared'); process.exit(0); })
  .catch(err => { console.error(err); process.exit(1); });