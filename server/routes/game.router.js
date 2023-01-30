const express = require('express');
const pool = require('../modules/pool');
const {rejectUnauthenticated} = require('../modules/authentication-middleware');
const router = express.Router();

// Wishlist - GET
router.get('/:id', rejectUnauthenticated, async (req, res) => {
  // console.log('In game router: Wishlist - GET');
  try{
    const userID = req.params.id;
    const wishlistResult = await pool.query(`SELECT * FROM "wishlist" WHERE "user_id" = $1;`, [userID]);
    res.send(wishlistResult);
  } catch (err) {
    console.log('Game Router Wishlist GET error:', err);
    res.sendStatus(500);
  }
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
