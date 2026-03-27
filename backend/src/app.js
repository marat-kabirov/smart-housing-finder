require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createTable } = require('./models/listing');
const listingsRouter = require('./routes/listings');
const authRouter = require('./routes/auth');
const favoritesRouter = require('./routes/favorites');
const aiRouter = require('./routes/ai');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/listings', listingsRouter);
app.use('/api/auth', authRouter);
app.use('/api/favorites', favoritesRouter);
app.use('/api/ai', aiRouter);

const PORT = process.env.PORT || 3001;

createTable().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});