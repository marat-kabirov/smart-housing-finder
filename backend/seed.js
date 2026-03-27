require('dotenv').config();
const { createTable, insertMany } = require('./src/models/listing');

const mockListings = [
  { title: '2-Zimmer Wohnung in Chemnitz', price: 550, city: 'Chemnitz', rooms: 2, size_sqm: 58, url: 'https://example.com/1', source: 'mock' },
  { title: 'Schöne 3-Zimmer Wohnung', price: 750, city: 'Leipzig', rooms: 3, size_sqm: 80, url: 'https://example.com/2', source: 'mock' },
  { title: '1-Zimmer Apartment zentral', price: 420, city: 'Chemnitz', rooms: 1, size_sqm: 35, url: 'https://example.com/3', source: 'mock' },
];

createTable()
  .then(() => insertMany(mockListings))
  .then(() => { console.log('Seeded!'); process.exit(0); });