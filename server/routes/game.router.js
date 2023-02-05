const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();
const processSurveyResults = require('../modules/processSurvey')

/* 
  WISHLIST ROUTES 
*/

// Wishlist - GET
router.get('/wishlist', rejectUnauthenticated, async (req, res) => {
  // console.log('In game router: Wishlist - GET');
  try {
    const userID = req.user.id
    const wishlistResult = await pool.query(`SELECT * FROM "wishlist" WHERE "user_id" = $1;`, [userID]);
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
    const wishlistGame = req.body;
    await pool.query(`INSERT INTO "wishlist" ("user_id", "game_id") 
                      VALUES ($1, $2);`, [wishlistGame.user_id, wishlistGame.game_id]);
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
    const ignorelistResult = await pool.query(`SELECT * FROM "ignorelist" WHERE "user_id" = $1;`, [userID]);
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
                      VALUES ($1, $2);`, [ignorelistGame.user_id, ignorelistGame.game_id]);
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
    const playedResult = await pool.query(`SELECT * FROM "played" WHERE "user_id" = $1;`, [userID]);
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
                      VALUES ($1, $2);`, [playedGame.user_id, playedGame.game_id]);
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
    const glossaryResult = await pool.query(`SELECT * FROM "glossary" WHERE "id" = $1;`, [termID]);
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
    const glossaryResult = await pool.query(`SELECT "tag_id", "term" FROM "glossary";`);
    res.send(glossaryResult);
  } catch (err) {
    console.log('Game Router Glossary GET error:', err);
    res.sendStatus(500);
  }
});

/*
  SURVEY ROUTES
*/

router.post('/survey', rejectUnauthenticated, async (req, res) => {

  console.log(req.body);
  const surveyResults = req.body;
  const user_id = req.user.id;

  const connection = await pool.connect();

  console.log(surveyResults);
  try {

    const [genreScores, tagScores] = processSurveyResults(surveyResults)

    // SQL transaction
    await connection.query('BEGIN;')

    // insert each genre score
    for (let i = 0; i < Object.keys(genreScores).length; i++) {
      await connection.query(`
        INSERT INTO user_genres
          ("user_id", "genre_name", "genre_score")
          VALUES ($1, $2, $3);
        `,
        [ user_id, Object.keys(genreScores)[i], Object.values(genreScores)[i] ]
      )
    }

    // insert each tag score
    for (let i = 0; i < Object.keys(tagScores).length; i++) {
      await connection.query(`
        INSERT INTO user_tags
          ("user_id", "tag_name", "score")
          VALUES ($1, $2, $3);
      `,
      [ user_id, Object.keys(tagScores)[i], Object.values(tagScores)[i] ]
      )
    }

    // commit changes
    await connection.query('COMMIT;')

    res.sendStatus(200)
  } catch (err) {
    // if anything goes wrong, discard all changes
    await connection.query('ROLLBACK;')
    console.log(err);
    res.sendStatus(500)
  } finally {
    connection.release();
  }

})

module.exports = router;
