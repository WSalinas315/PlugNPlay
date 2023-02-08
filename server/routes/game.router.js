const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

const key = process.env.RAWG_API_KEY;
const keyUrl = ("key=" + key);

// HELPER FUNCTION
//* filters out non-english tags, isolates the tag name, and sorts alphabetically
const tagFilter = (game) => {
  const gameTags =
    game.tags
      .filter(tag => tag.language === "eng")
      .map(tag => tag.name)
      .sort()
  //* returns game object, with tags filtered
  return {
    ...game,
    tags: gameTags.map(tag => tag.toLowerCase())
  }
}

/* ----------------
  WISHLIST ROUTES 
------------------*/

// Wishlist - GET
router.get('/wishlist', rejectUnauthenticated, async (req, res) => {
  // console.log('In game router: Wishlist - GET');
  let wishlistGames = [];
  const userID = req.user.id;

  try {
    // Get a list of wishlisted games for the current user from the database
    const { rows: wishlistResult } = await pool.query(`SELECT * FROM "wishlist" WHERE "user_id" = $1;`, [userID]);

    // Makes GET request to RAWG API for detailed game data for each game on the wishlist
    for (let wish of wishlistResult) {
      wishlistGames.push(axios.get(`https://api.rawg.io/api/games/${wish.game_id}?${keyUrl}`,
        { validateStatus: (status) => status < 500 })) // prevents request from throwing error if it returns a 404
    }
    const wishlistGamesObjects = await Promise.all(wishlistGames);

    // data cleanup
    const wishedGames =
      wishlistGamesObjects
        .filter(obj => obj.status < 300) // filters out any queries that returned a 404
        .map(obj => obj.data) // isolates the actual API results
        .flat() // flattens the results into a single one-dimensional array
        .map(tagFilter); // remove non-english tags

    // Send back detailed results
    res.send(wishedGames);
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
  const wishlistID = req.params.id;
  try {
    await pool.query(`DELETE FROM "wishlist" WHERE "game_id" = $1;`, [wishlistID]);
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
  let ignoredGames = [];

  try {
    // Get a list of ignored games for the current user from the database
    const { rows: ignorelistResult } = await pool.query(`SELECT * FROM "ignorelist" WHERE "user_id" = $1;`, [userID]);

    // Makes GET request to RAWG API for detailed game data for each game on the ignorelist
    for (let outcast of ignorelistResult) {
      ignoredGames.push(axios.get(`https://api.rawg.io/api/games/${outcast.game_id}?${keyUrl}`,
        { validateStatus: (status) => status < 500 })) // prevents request from throwing error if it returns a 404
    }
    const ignorelistGamesObjects = await Promise.all(ignoredGames);

    // data cleanup
    const ignoreList =
      ignorelistGamesObjects
        .filter(obj => obj.status < 300) // filters out any queries that returned a 404
        .map(obj => obj.data) // isolates the actual API results
        .flat() // flattens the results into a single one-dimensional array
        .map(tagFilter); // remove non-english tags

    // Send back detailed results
    res.send(ignoreList);
  } catch (err) {
    console.log('Game Router Ignore List GET by ID error:', err);
    res.sendStatus(500);
  }
});

// Ignore List - POST
router.post('/ignorelist', rejectUnauthenticated, async (req, res) => {
  // console.log('In game router: Ignore List - POST');
  const { gameID } = req.body;
  const userID = req.user.id;
  try {
    await pool.query(`INSERT INTO "ignorelist" ("user_id", "game_id") 
                      VALUES ($1, $2);`, [userID, gameID]);
    res.sendStatus(201);
  } catch (err) {
    console.log('Game Router Ignore List POST error:', err);
    res.sendStatus(500);
  }
});

// Ignore List - DELETE by game ID
router.delete('/ignorelist/:gameID', rejectUnauthenticated, async (req, res) => {
  // console.log('In game router: Ignore List - DELETE by ID');
  const { gameID } = req.params;
  try {
    await pool.query(`DELETE FROM "ignorelist" WHERE "game_id" = $1 AND "user_id" = $2;`, [gameID, req.user.id]);
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
  let playedGames = [];

  try {
    // Get a list of played games for the current user from the database
    const { rows: playedResult } = await pool.query(`SELECT * FROM "played" WHERE "user_id" = $1;`, [userID]);

    // Makes GET request to RAWG API for detailed game data for each game on the played games table
    for (let game of playedResult) {
      playedGames.push(axios.get(`https://api.rawg.io/api/games/${game.game_id}?${keyUrl}`,
        { validateStatus: (status) => status < 500 })) // prevents request from throwing error if it returns a 404
    }
    const playedGamesObject = await Promise.all(playedGames);

    // data cleanup
    const playedList =
      playedGamesObject
        .filter(obj => obj.status < 300) // filters out any queries that returned a 404
        .map(obj => obj.data) // isolates the actual API results
        .flat() // flattens the results into a single one-dimensional array
        .map(tagFilter); // remove non-english tags

    // Append game rating to detailed game info
    for(let playedGame of playedList){
      for(let dbGame of playedResult){
        if(dbGame.game_id == playedGame.id){
          playedGame.liked = dbGame.liked;
        }
      }
    }

    // Send back detailed results
    res.send(playedList);
  } catch (err) {
    console.log('Game Router Played List GET by ID error:', err);
    res.sendStatus(500);
  }
});

// Played List - POST
router.post('/played', rejectUnauthenticated, async (req, res) => {
  // console.log('In game router: Played List - POST');
  const { gameID } = req.body;
  const userID = req.user.id;
  try {
    await pool.query(`INSERT INTO "played" ("user_id", "game_id") 
                      VALUES ($1, $2);`, [userID, gameID]);
    res.sendStatus(201);
  } catch (err) {
    console.log('Game Router Played List POST error:', err);
    res.sendStatus(500);
  }
});

router.delete('/played/:gameID', rejectUnauthenticated, async (req, res) => {

  const { gameID } = req.params;

  try {
    await pool.query(`DELETE FROM "played"
                      WHERE "game_id" = $1 AND "user_id" = $2`, [gameID, req.user.id])
    res.sendStatus(200);
  } catch (err) {
    console.log('Game router Played List DELETE', err);
    res.sendStatus(500);
  }
})

/* -------------------------------------------------------------
Played List - PUT by game ID and adjust user genre/tag scores
---------------------------------------------------------------*/
router.put('/played/:id', rejectUnauthenticated, async (req, res) => {
  // console.log('In game router: Played List - PUT by ID');
  const gameID = req.params.id;
  const gameRating = req.body.liked;
  const userID = req.user.id;

  try {
    // userScores is a combination of genre and tag names & scores
    const { rows: userScores } = await pool.query(
      `SELECT "genre_name" AS "name", "score" FROM "user_genres" WHERE "user_id" = $1
    UNION
    SELECT "tag_name" AS "name", "score" FROM "user_tags" WHERE "user_id" = $1;`, [userID]
    );

    // gets count of rated games for current user
    const { rows: gameCount } = await pool.query(
      `SELECT COUNT(*) AS "count" FROM "played" 
    WHERE "user_id" = $1 AND "liked" = 1 OR "liked" = -1;`, [userID]
    );

    // Update liked status in played games table
    await pool.query(`UPDATE "played" SET "liked" = $1 WHERE "game_id" = $2 AND "user_id" = $3`, [gameRating, gameID, userID]);

    // Get game information from RAWG
    const { data: ratedGame } = await axios.get(`https://api.rawg.io/api/games/${gameID}?${keyUrl}`,
      { validateStatus: (status) => status < 500 });

    // tag matching for user score adjustments
    for (let tag of ratedGame.tags) {
      for (let userTag of userScores) {
        if (tag.slug == userTag.name) {
          let newScore = 0;
          // calculate score adjustment
          let scoreAdjustment = 0.05;
          if (gameCount[0].count < 100) {
            scoreAdjustment += (0.05 * ((100 - gameCount[0].count) / 100));
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
          await pool.query(`UPDATE "user_tags" SET "score" = $1 WHERE "user_id" = $2 AND "tag_name" = $3;`, [newScore, userID, tag.slug]);
        }
      }
    }

    // genre matching for user score adjustments
    for (let genre of ratedGame.genres) {
      for (let userGenre of userScores) {
        if (genre.slug == userGenre.name) {
          let newScore = 0;
          // calculate score adjustment
          let scoreAdjustment = 0.05;
          if (gameCount[0].count < 100) {
            scoreAdjustment += (0.05 * ((100 - gameCount[0].count) / 100));
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

module.exports = router;
