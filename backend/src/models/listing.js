const pool = require('../config/db');

const createTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS listings (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      price INTEGER,
      city TEXT,
      rooms NUMERIC(3,1),
      size_sqm INTEGER,
      url TEXT,
      source TEXT,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `);
};

const getAll = async (filters = {}) => {
  const { city, min_price, max_price, min_rooms } = filters;
  let query = 'SELECT * FROM listings WHERE 1=1';
  const values = [];
  let i = 1;

  if (city) { query += ` AND city ILIKE $${i++}`; values.push(`%${city}%`); }
  if (min_price) { query += ` AND price >= $${i++}`; values.push(min_price); }
  if (max_price) { query += ` AND price <= $${i++}`; values.push(max_price); }
  if (min_rooms) { query += ` AND rooms >= $${i++}`; values.push(min_rooms); }

  query += ' ORDER BY created_at DESC';
  const result = await pool.query(query, values);
  return result.rows;
};

const insertMany = async (listings) => {
  for (const l of listings) {
    await pool.query(
      `INSERT INTO listings (title, price, city, rooms, size_sqm, url, source)
       VALUES ($1,$2,$3,$4,$5,$6,$7)
       ON CONFLICT DO NOTHING`,
      [l.title, l.price, l.city, l.rooms, l.size_sqm, l.url, l.source]
    );
  }
};

module.exports = { createTable, getAll, insertMany };