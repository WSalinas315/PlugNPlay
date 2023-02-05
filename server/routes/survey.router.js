const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();
const processSurveyResults = require('../modules/processSurvey')

/*
  SURVEY ROUTES
*/

// CONVERT SURVEY RESULTS TO USER SCORES
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