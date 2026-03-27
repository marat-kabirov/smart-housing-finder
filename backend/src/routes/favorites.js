const router = require('express').Router();
const pool = require('../config/db');
const requireAuth = require('../middleware/auth');

// Получить избранное
router.get('/', requireAuth, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT l.* FROM listings l
       JOIN favorites f ON f.listing_id = l.id
       WHERE f.user_id = $1
       ORDER BY f.created_at DESC`,
      [req.userId]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Добавить в избранное
router.post('/:listingId', requireAuth, async (req, res) => {
  try {
    await pool.query(
      'INSERT INTO favorites (user_id, listing_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
      [req.userId, req.params.listingId]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Удалить из избранного
router.delete('/:listingId', requireAuth, async (req, res) => {
  try {
    await pool.query(
      'DELETE FROM favorites WHERE user_id = $1 AND listing_id = $2',
      [req.userId, req.params.listingId]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;