const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();

/* 
  WISHLIST ROUTES 
*/

// Wishlist - GET
router.get('/wishlist/:id', rejectUnauthenticated, async (req, res) => {
  // console.log('In game router: Wishlist - GET');
  try {
    const userID = req.params.id;
    const wishlistResult = await pool.query(`SELECT * FROM "wishlist" WHERE "user_id" = $1;`, [userID]);
    res.send(wishlistResult);
  } catch (err) {
    console.log('Game Router Wishlist GET error:', err);
    res.sendStatus(500);
  }
});

// Wishlist - POST
router.post('/wishlist', rejectUnauthenticated, async (req, res) => {
  // console.log('In game router: Wishlist - POST');
  try {
    const wishlistItem = req.body;
    await pool.query(`INSERT INTO "wishlist" ("user_id", "game_id") 
                      VALUES ($1, $2);`, [wishlistItem.user_id, wishlistItem.game_id]);
    res.sendStatus(201);
    // pool.query(`INSERT INTO "wishlist" ("user_id","game_id") VALUES ($1, $2);`, [wishlistItem.user_id, wishlistItem.game_id]).then((result) => {
    //  res.sendStatus(201);
    // });
  } catch (err) {
    console.log('Game Router Wishlist POST error:', err);
    res.sendStatus(500);
  }
});

// Wishlist - DELETE
router.delete('/wishlist/:id', rejectUnauthenticated, async (req, res) => {
  // console.log('In game router: Wishlist - DELETE');
  try {
    const wishlistID = req.params.id;
    await pool.query(`DELETE FROM "wishlist" WHERE "id" = $1;`, [wishlistID]);
    res.sendStatus(200);
  } catch (err) {
    console.log('Game Router Wishlist DELETE error:', err);
    res.sendStatus(500);
  }
});

/* 
  IGNORE LIST ROUTES 
*/

// Ignore List - GET
router.get('/ignorelist/:id', rejectUnauthenticated, async (req, res) => {
  // console.log('In game router: Ignore List - GET');
  try {
    const userID = req.params.id;
    const ignorelistResult = await pool.query(`SELECT * FROM "ignorelist" WHERE "user_id" = $1;`, [userID]);
    res.send(ignorelistResult);
  } catch (err) {
    console.log('Game Router Ignore List GET error:', err);
    res.sendStatus(500);
  }
});

// Ignore List - POST
router.post('/ignorelist', rejectUnauthenticated, async (req, res) => {
  // console.log('In game router: Ignore List - POST');
  try {
    const ignorelistItem = req.body;
    await pool.query(`INSERT INTO "ignorelist" ("user_id", "game_id") 
                      VALUES ($1, $2);`, [ignorelistItem.user_id, ignorelistItem.game_id]);
    res.sendStatus(201);
  } catch (err) {
    console.log('Game Router Ignore List POST error:', err);
    res.sendStatus(500);
  }
});

module.exports = router;
