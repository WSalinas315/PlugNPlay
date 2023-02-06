const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

const { rejectUnauthenticated } = require('../modules/authentication-middleware')

const key = process.env.RAWG_API_KEY;
const keyUrl = ("key=" + key);

// ==========================================================================================
// GET BY NAME

router.get('/byName/:name', async (req, res) => {

  const { name } = req.params;

  try {
    const { data: games } = await axios.get(`https://api.rawg.io/api/games?${keyUrl}&search=${name}&page_size=40`)
    res.send(games)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }

})

// ==========================================================================================
// GET BY ID

router.get('/byID/:id', async (req, res) => {

  const { id } = req.params;

  try {
    const { data: game } = await axios.get(`https://api.rawg.io/api/games/${id}?${keyUrl}&page_size=40`)
    res.send(game)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }

});

// ==========================================================================================
// GET BY GENRE

router.get('/byGenre/:genre', async (req, res) => {

  const { genre } = req.params;

  console.log('searching for genre', genre, '...');
  try {
    const { data: games } = await axios.get(`https://api.rawg.io/api/games?genres=${genre}&${keyUrl}&page_size=40`)
    res.send(games)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

// ==========================================================================================
// GET BY GENRE - TEST FOR RECOMMENDATIONS

router.get('/byGenre/', async (req, res) => {

  // initialize empty array
  const searchQueries = [];

  // current user ID
  const userID = req.user.id;

  //* function to shuffle array for randomization and only return 3 genres
  const shuffleArray = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // userScores is a combination of genre and tag names & scores
  const { rows: userScores } = await pool.query(`SELECT "genre_name" AS "name", "score" FROM "user_genres" WHERE "user_id" = $1
                                UNION
                                SELECT "tag_name" AS "name", "score" FROM "user_tags" WHERE "user_id" = $1;`, [userID]);
  console.log('UserScores looks like:', userScores);

  // ignoreList is a combination of game IDs for the current user's wishlist, played list and ignore list
  const { rows: ignoreList } = await pool.query(`SELECT "game_id" FROM "wishlist" WHERE "user_id" = $1
                                UNION
                                SELECT "game_id" FROM "ignorelist" WHERE "user_id" = $1
                                UNION
                                SELECT "game_id" FROM "played" WHERE "user_id" = $1;`, [userID]);
  console.log('IgnoreList looks like:', ignoreList);

  // get list of positively rated user genres, 
  // randomize list 
  // and only query RAWG for the first 3
  let { rows: userGenres } = await pool.query(`SELECT "genre_name" FROM "user_genres" WHERE "user_id" = $1 AND "score" > 0;`, [userID]);
  console.log('userGenres looks like:', userGenres);
  const genreList = await shuffleArray(userGenres).slice(0, 3);
  //const genreList = await shuffleArray(userGenres);

  console.log('genreList looks like:', genreList);

  // HELPER FUNCTIONS
  //* function to filter out duplicate results
  const dupeFilter = (obj, idx, arr) => {
    return idx === arr.findIndex((game) => {
      return game.name === obj.name && game.id === obj.id
    })
  }

  //* filters out non-english tags, isolates the tag name, and sorts alphabetically
  const tagFilter = (game) => {
    const gameTags =
      game.tags
        .filter(tag => tag.language === "eng")
        .map(tag => tag.name)
        .sort();

    //* returns game object, with tags filtered
    return {
      ...game,
      tags: gameTags.map(tag => tag.toLowerCase())
    }
  }

  console.log('searching for genres...');
  // Axios GET calls to RAWG.io for the 3 selected genres
  try {
    for (let genre of genreList) {
      searchQueries.push(axios.get(`https://api.rawg.io/api/games?genres=${genre.genre_name}&${keyUrl}&page_size=40`,
        { validateStatus: (status) => status < 500 })) // prevents request from throwing error if it returns a 404
      searchQueries.push(axios.get(`https://api.rawg.io/api/games?genres=${genre.genre_name}&${keyUrl}&page_size=40&page=2`,
        { validateStatus: (status) => status < 500 }))
      searchQueries.push(axios.get(`https://api.rawg.io/api/games?genres=${genre.genre_name}&${keyUrl}&page_size=40&page=3`,
        { validateStatus: (status) => status < 500 }))
    }
    const taggedGameObjects = await Promise.all(searchQueries);

    let taggedGames =
      await taggedGameObjects
        .filter(obj => obj.status < 300) // filters out any queries that returned a 404
        .map(obj => obj.data.results) // isolates the actual API results
        .flat() // flattens the results into a single one-dimensional array
        .filter(dupeFilter)
        .map(tagFilter);

    // Game Scoring
    console.log('--------------------------------------------');
    console.log('Entering scoring!');
    console.log('--------------------------------------------');
    let scoredGames = [];
    for (let game of taggedGames) {
      // Ignore games in the ignoreList
      let omitGame = 'FALSE';
      for (let outcast of ignoreList) {
        if (outcast.game_id == game.id) {
          omitGame = 'TRUE';
        }
      }
      // Process scoring for games not in ignoreList
      if (omitGame == 'FALSE') {
        // game score based on user data
        let gameScore = 0;
        // number of matching tags/genres for averaging
        let tagMatchCount = 0;
        // metacritic adjustment score
        let metaAdjustment = 0;

        // tag matching and scoring
        for (let gameTag of game.tags) {
          for (let userTag of userScores) {
            if (gameTag == userTag.name) {
              if (userTag.score < 0) {
                gameScore += (userTag.score - 0.1);
              } else if (userTag.score > 0.5) {
                gameScore += (userTag.score + 0.1);
              } else {
                gameScore += userTag.score;
              }
              tagMatchCount++;
            }
          }
        }

        // genre matching and scoring
        for (let genre of game.genres) {
          for (let userGenre of userScores) {
            if (genre.slug == userGenre.name) {
              if (userGenre.score < 0) {
                gameScore += (userGenre.score - 0.1);
              } else if (userGenre.score > 0.5) {
                gameScore += (userGenre.score + 0.1);
              } else {
                gameScore += userGenre.score;
              }
              tagMatchCount++;
            }
          }
        }

        // average combined tag scores
        gameScore = gameScore / tagMatchCount;

        // adjust gameScore with metacritic rating
        if (game.metacritic) {
          metaAdjustment = ((game.metacritic - 70) / 20) * 0.075;
          gameScore += metaAdjustment;
        }

        // Adjust outlier scores to end of scoring range
        if (gameScore > 1) {
          gameScore = 1;
        } else if (gameScore < -1) {
          gameScore = -1;
        }
        // add game data and game score to scoredGames array
        scoredGames.push({ gameData: game, gameScore: gameScore });
      }
    }

    // Sort scored games by user's personalized game score
    const sortedGames = scoredGames.sort((g1, g2) => (g1.gameScore < g2.gameScore) ? 1 : (g1.gameScore > g2.gameScore) ? -1 : 0);
    console.log('--------------------------------------------');
    console.log('Sorted & Scored Games!!!!', sortedGames);
    console.log('--------------------------------------------');

    // send sortedGames back to client side
    res.send(sortedGames);
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

// ==========================================================================================
// GET BY RELEVANT TAGS

router.get('/byTags', async (req, res) => {

  const { userTags } = req.body;

  // Replace req.body request above 
  // const userID = req.user.id;
  // const userTags = await pool.query(`SELECT "tag_name" FROM "user_tags" WHERE "user_id" = $1 AND score > 0;`, [userID]);

  const searchQueries = [];

  // HELPER FUNCTIONS
  //* function to filter out duplicate results
  const dupeFilter = (obj, idx, arr) => {
    return idx === arr.findIndex((game) => {
      return game.name === obj.name && game.id === obj.id
    })
  }

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

  //* sorts games in order of most matched tags to fewest
  const sortByTagRelevance = (a, b) => {
    return b.tags.filter(tag => userTags.includes(tag.toLowerCase())).length -
      a.tags.filter(tag => userTags.includes(tag.toLowerCase())).length
  }

  // QUERY
  try {

    for (let tag of userTags) {
      searchQueries.push(axios.get(`https://api.rawg.io/api/games?${keyUrl}&tags=${tag.toLowerCase()}&page_size=40`,
        { validateStatus: (status) => status < 500 })) // prevents request from throwing error if it returns a 404
      searchQueries.push(axios.get(`https://api.rawg.io/api/games?${keyUrl}&tags=${tag.toLowerCase()}&page_size=40&page=2`,
        { validateStatus: (status) => status < 500 }))
      searchQueries.push(axios.get(`https://api.rawg.io/api/games?${keyUrl}&tags=${tag.toLowerCase()}&page_size=40&page=3`,
        { validateStatus: (status) => status < 500 }))
    }

    const taggedGameObjects = await Promise.all(searchQueries)

    const taggedGames =
      taggedGameObjects
        .filter(obj => obj.status < 300) // filters out any queries that returned a 404
        .map(obj => obj.data.results) // isolates the actual API results
        .flat() // flattens the results into a single one-dimensional array
        .filter(dupeFilter)
        .map(tagFilter)
        .sort(sortByTagRelevance);

    res.send(taggedGames)

  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }

})

module.exports = router;
