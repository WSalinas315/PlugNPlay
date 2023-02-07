const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();

/* ----------------
  WISHLIST ROUTES 
------------------*/

// Wishlist - GET
router.get('/wishlist', rejectUnauthenticated, async (req, res) => {
  // console.log('In game router: Wishlist - GET');
  const userID = req.user.id;
  try {
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
  const userID = req.user.id;
  const wishlistGame = req.body;
  try {
    await pool.query(`INSERT INTO "wishlist" ("user_id", "game_id") 
                      VALUES ($1, $2);`, [userID, wishlistGame.game_id]);
    res.sendStatus(201);
  } catch (err) {
    console.log('Game Router Wishlist POST error:', err);
    res.sendStatus(500);
  }
});

// Wishlist - DELETE by game ID
router.delete('/wishlist/:id', rejectUnauthenticated, async (req, res) => {
  // console.log('In game router: Wishlist - DELETE by ID');
  const wishlistID = req.params.id;
  try {
    await pool.query(`DELETE FROM "wishlist" WHERE "id" = $1;`, [wishlistID]);
    res.sendStatus(200);
  } catch (err) {
    console.log('Game Router Wishlist DELETE by ID error:', err);
    res.sendStatus(500);
  }
});

/* -------------------
  IGNORE LIST ROUTES 
---------------------*/

// Ignore List - GET
router.get('/ignorelist', rejectUnauthenticated, async (req, res) => {
  // console.log('In game router: Ignore List - GET');
  const userID = req.user.id;
  try {
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
  const ignorelistGame = req.body;
  const userID = req.user.id;
  try {
    await pool.query(`INSERT INTO "ignorelist" ("user_id", "game_id") 
                      VALUES ($1, $2);`, [userID, ignorelistGame.game_id]);
    res.sendStatus(201);
  } catch (err) {
    console.log('Game Router Ignore List POST error:', err);
    res.sendStatus(500);
  }
});

// Ignore List - DELETE by game ID
router.delete('/ignorelist/:id', rejectUnauthenticated, async (req, res) => {
  // console.log('In game router: Ignore List - DELETE by ID');
  const ignorelistID = req.params.id;
  try {
    await pool.query(`DELETE FROM "ignorelist" WHERE "id" = $1;`, [ignorelistID]);
    res.sendStatus(200);
  } catch (err) {
    console.log('Game Router Ignore List DELETE by ID error:', err);
    res.sendStatus(500);
  }
});

/* -------------------
  PLAYED GAMES ROUTES
----------------------*/

// Played List - GET
router.get('/played', rejectUnauthenticated, async (req, res) => {
  // console.log('In game router: Played List - GET');
  const userID = req.user.id;
  try {
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
  const playedGame = req.body;
  const userID = req.user.id;
  try {
    await pool.query(`INSERT INTO "played" ("user_id", "game_id") 
                      VALUES ($1, $2);`, [userID, playedGame.game_id]);
    res.sendStatus(201);
  } catch (err) {
    console.log('Game Router Played List POST error:', err);
    res.sendStatus(500);
  }
});

// Played List - PUT by game ID
router.put('/played/:id', rejectUnauthenticated, async (req, res) => {
  // console.log('In game router: Played List - PUT by ID');
  const gameID = req.params.id;
  // -1,0,1
  const gameRating = req.body.liked;
  // Should be possible to send tags/genres
  const tagArray = req.body.tags;
  const genreArray = req.body.genres;
  const userID = req.user.id;

  // userScores is a combination of genre and tag names & scores
  const { rows: userScores } = await pool.query(
    `SELECT "genre_name" AS "name", "score" FROM "user_genres" WHERE "user_id" = $1
    UNION
    SELECT "tag_name" AS "name", "score" FROM "user_tags" WHERE "user_id" = $1;`, [userID]
  );
  console.log('UserScores looks like:', userScores);

  // gets count of rated games for current user
  const { rows: gameCount } = await pool.query(
    `SELECT COUNT(*) AS "count" FROM "played" 
    WHERE "user_id" = $1 AND "liked" = 1 OR "liked" = -1;`, [userID]
  );

  try {
    // Update liked status in played games table
    await pool.query(`UPDATE "played" SET "liked" = $1 WHERE "game_id" = $2 AND "user_id" = $3`, [gameRating, gameID, userID]);

    // tag matching for user score adjustments
    for (let tag of tagArray) {
      for (let userTag of userScores) {
        if (tag == userTag.name) {
          let newScore = 0;
          // calculate score adjustment
          let scoreAdjustment = 0.05;
          if(gameCount < 100){
            scoreAdjustment += (0.05 * ((100 - gameCount) / 100));
          }
          // apply score adjustment based on positive/negative rating
          if (gameRating > 0) {
            newScore = userTag.score + scoreAdjustment;
          } else if (gameRating < 0) {
            newScore = userTag.score - scoreAdjustment;
          }
          // Adjust outlier scores to end of scoring range
          if (newScore > 1) {
            newScore = 1;
          } else if (newScore < -1) {
            newScore = -1;
          }
          // Update tag score for this user in user_tags table
          await pool.query(`UPDATE "user_tags" SET "score" = $1 WHERE "user_id" = $2 AND "tag_name" = $3;`, [newScore, userID, tag]);
        }
      }
    }

    // genre matching for user score adjustments
    for (let genre of genreArray) {
      for (let userGenre of userScores) {
        if (genre.slug == userGenre.name) {
          let newScore = 0;
          // calculate score adjustment
          let scoreAdjustment = 0.05;
          if(gameCount < 100){
            scoreAdjustment += (0.05 * ((100 - gameCount) / 100));
          }
          // apply score adjustment based on positive/negative rating
          if (gameRating > 0) {
            newScore = userGenre.score + scoreAdjustment;
          } else if (gameRating < 0) {
            newScore = userGenre.score - scoreAdjustment;
          }
          // Adjust outlier scores to end of scoring range
          if (newScore > 1) {
            newScore = 1;
          } else if (newScore < -1) {
            newScore = -1;
          }
          // Update genre score for this user in user_genres table
          await pool.query(`UPDATE "user_genres" SET "score" = $1 WHERE "user_id" = $2 AND "genre_name" = $3;`, [newScore, userID, genre.slug]);
        }
      }
    }

    res.sendStatus(200);

  } catch (err) {
    console.log('Game Router Played List PUT by ID error:', err);
    res.sendStatus(500);
  }
});

// Played List - DELETE by game ID
router.put('/played/:id', rejectUnauthenticated, async (req, res) => {
  // console.log('In game router: Played List - DELETE by ID');
  const gameID = req.params.id;
  try {
    await pool.query(`DELETE FROM "played" WHERE "id" = $1;`, [gameID]);
    res.sendStatus(200);
  } catch (err) {
    console.log('Game router Played List DELETE by ID error:', err);
    res.sendStatus(500);
  }
});

module.exports = router;
