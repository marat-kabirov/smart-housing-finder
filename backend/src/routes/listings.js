const router = require('express').Router();
const { getAll } = require('../models/listing');

router.get('/', async (req, res) => {
  try {
    const listings = await getAll(req.query);
    res.json(listings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;