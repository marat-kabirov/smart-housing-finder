require('dotenv').config();
const pool = require('./src/config/db');

const migrate = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS favorites (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      listing_id INTEGER REFERENCES listings(id) ON DELETE CASCADE,
      created_at TIMESTAMP DEFAULT NOW(),
      UNIQUE(user_id, listing_id)
    )
  `);

  console.log('Migration complete!');
  process.exit(0);
};

migrate().catch(err => { console.error(err); process.exit(1); });