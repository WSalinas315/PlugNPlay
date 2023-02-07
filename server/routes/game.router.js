const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();

/* 
  WISHLIST ROUTES 
*/

// Wishlist - GET
router.get('/wishlist', rejectUnauthenticated, async (req, res) => {
  // console.log('In game router: Wishlist - GET');
  try {
    const userID = req.user.id
    const { rows: wishlistResult } = await pool.query(`SELECT * FROM "wishlist" WHERE "user_id" = $1;`, [userID]);
    res.send(wishlistResult);
  } catch (err) {
    console.log('Game Router Wishlist GET by ID error:', err);
    res.sendStatus(500);
  }
});

// Wishlist - POST
router.post('/wishlist', rejectUnauthenticated, async (req, res) => {
  // console.log('In game router: Wishlist - POST');
  try {
    const { gameID } = req.body;
    console.log(req.body)
    await pool.query(`INSERT INTO "wishlist" ("user_id", "game_id") 
                      VALUES ($1, $2);`, [req.user.id, gameID]);
    res.sendStatus(201);
  } catch (err) {
    console.log('Game Router Wishlist POST error:', err);
    res.sendStatus(500);
  }
});

// Wishlist - DELETE by game ID
router.delete('/wishlist/:id', rejectUnauthenticated, async (req, res) => {
  // console.log('In game router: Wishlist - DELETE by ID');
  try {
    const wishlistID = req.params.id;
    await pool.query(`DELETE FROM "wishlist" WHERE "id" = $1;`, [wishlistID]);
    res.sendStatus(200);
  } catch (err) {
    console.log('Game Router Wishlist DELETE by ID error:', err);
    res.sendStatus(500);
  }
});

/* 
  IGNORE LIST ROUTES 
*/

// Ignore List - GET
router.get('/ignorelist', rejectUnauthenticated, async (req, res) => {
  // console.log('In game router: Ignore List - GET');
  try {
    const userID = req.user.id;
    const { rows: ignorelistResult } = await pool.query(`SELECT * FROM "ignorelist" WHERE "user_id" = $1;`, [userID]);
    res.send(ignorelistResult);
  } catch (err) {
    console.log('Game Router Ignore List GET by ID error:', err);
    res.sendStatus(500);
  }
});

// Ignore List - POST
router.post('/ignorelist', rejectUnauthenticated, async (req, res) => {
  // console.log('In game router: Ignore List - POST');
  try {
    const ignorelistGame = req.body;
    await pool.query(`INSERT INTO "ignorelist" ("user_id", "game_id") 
                      VALUES ($1, $2);`, [req.user.id, ignorelistGame.game_id]);
    res.sendStatus(201);
  } catch (err) {
    console.log('Game Router Ignore List POST error:', err);
    res.sendStatus(500);
  }
});

// Ignore List - DELETE by game ID
router.delete('/ignorelist/:id', rejectUnauthenticated, async (req, res) => {
  // console.log('In game router: Ignore List - DELETE by ID');
  try {
    const ignorelistID = req.params.id;
    await pool.query(`DELETE FROM "ignorelist" WHERE "id" = $1;`, [ignorelistID]);
    res.sendStatus(200);
  } catch (err) {
    console.log('Game Router Ignore List DELETE by ID error:', err);
    res.sendStatus(500);
  }
});

/* 
  PLAYED GAMES ROUTES
*/

// Played List - GET
router.get('/played', rejectUnauthenticated, async (req, res) => {
  // console.log('In game router: Played List - GET');
  try {
    const userID = req.user.id;
    const { rows: playedResult } = await pool.query(`SELECT * FROM "played" WHERE "user_id" = $1;`, [userID]);
    res.send(playedResult);
  } catch (err) {
    console.log('Game Router Played List GET by ID error:', err);
    res.sendStatus(500);
  }
});

// Played List - POST
router.post('/played', rejectUnauthenticated, async (req, res) => {
  // console.log('In game router: Played List - POST');
  try {
    const playedGame = req.body;
    await pool.query(`INSERT INTO "played" ("user_id", "game_id") 
                      VALUES ($1, $2);`, [req.user.id, playedGame.game_id]);
    res.sendStatus(201);
  } catch (err) {
    console.log('Game Router Played List POST error:', err);
    res.sendStatus(500);
  }
});

// Played List - PUT by game ID
router.put('/played/:id', rejectUnauthenticated, async (req, res) => {
  // console.log('In game router: Played List - PUT by ID');
  try {
    const gameID = req.params.id;
    const gameRating = req.body.liked;
    await pool.query(`UPDATE "played" SET "liked" = $1 WHERE "id" = $2`, [gameRating, gameID]);
    res.sendStatus(200);
  } catch (err) {
    console.log('Game Router Played List PUT by ID error:', err);
    res.sendStatus(500);
  }
});

// Played List - DELETE by game ID
router.put('/played/:id', rejectUnauthenticated, async (req, res) => {
  // console.log('In game router: Played List - DELETE by ID');
  try {
    const gameID = req.params.id;
    await pool.query(`DELETE FROM "played" WHERE "id" = $1;`, [gameID]);
    res.sendStatus(200);
  } catch (err) {
    console.log('Game router Played List DELETE by ID error:', err);
    res.sendStatus(500);
  }
});

/* 
  GLOSSARY LIST ROUTES
*/

// Glossary - GET by ID
router.get('/glossary/:id', rejectUnauthenticated, async (req, res) => {
  // console.log('In game router: Glossary - GET by ID');
  try {
    const termID = req.params.id;
    const { rows: glossaryResult } = await pool.query(`SELECT * FROM "glossary" WHERE "id" = $1;`, [termID]);
    res.send(glossaryResult);
  } catch (err) {
    console.log('Game Router Glossary GET by ID error:', err);
    res.sendStatus(500);
  }
});

// Glossary - GET all
router.get('/glossary', rejectUnauthenticated, async (req, res) => {
  // console.log('In game router: Glossary - GET');
  try {
    const { rows: glossaryResult } = await pool.query(`SELECT "tag_id", "term" FROM "glossary";`);
    res.send(glossaryResult);
  } catch (err) {
    console.log('Game Router Glossary GET error:', err);
    res.sendStatus(500);
  }
});

module.exports = router;
