const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const { processSurveyResults } = require('../modules/processSurvey')

/*
  SURVEY ROUTES
*/

// ==========================================================================================
// GET ALL SURVEY QUESTIONS
router.get('/', rejectUnauthenticated, async (req, res) => {

  try {
    const surveyQuestions = await pool.query('SELECT * FROM survey_questions');
    res.send(surveyQuestions.rows);
  } catch (err) {
    console.log('Error getting survey questions', err);
    res.sendStatus(500);
  }
})

// ==========================================================================================
// CONVERT SURVEY RESULTS TO USER SCORES
router.post('/userScores', rejectUnauthenticated, async (req, res) => {

  console.log(req.body);
  const surveyResults = req.body; // array of { id, score } objects for each question
  const user_id = req.user.id;

  const connection = await pool.connect();

  console.log(surveyResults);
  try {

    // get survey questions
    const { rows: surveyQuestions } = await pool.query('SELECT * FROM survey_questions');

    // feed questions and results into processing module
    const [genreScores, tagScores] = processSurveyResults(surveyQuestions, surveyResults)

    // SQL transaction
    await connection.query('BEGIN;')

    // insert each genre score
    for (let i = 0; i < Object.keys(genreScores).length; i++) {
      await connection.query(`
        INSERT INTO user_genres
          ("user_id", "genre_name", "score")
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
    await connection.query('COMMIT;');
    res.sendStatus(201);

  } catch (err) {
    // if anything goes wrong, discard all changes
    await connection.query('ROLLBACK;');
    console.log(err);
    res.sendStatus(500);
  } finally {
    connection.release();
  }

})

module.exports = router;