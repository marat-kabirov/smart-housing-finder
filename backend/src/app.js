require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createTable } = require('./models/listing');
const listingsRouter = require('./routes/listings');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/listings', listingsRouter);

const PORT = process.env.PORT || 3001;

createTable().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});