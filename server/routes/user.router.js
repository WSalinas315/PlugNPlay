const express = require('express');
const router = express.Router();
const encryptLib = require('../modules/encryption');
const userStrategy = require('../strategies/user.strategy');
const pool = require('../modules/pool');

const { default: axios } = require('axios');

const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// ================================
// USER AUTH ROUTES

router.get('/', rejectUnauthenticated, (req, res) => {
	res.send(req.user);
});

router.post('/register', (req, res, next) => {
	const username = req.body.username;
	const password = encryptLib.encryptPassword(req.body.password);
	const access_level = 0;

	const queryText = `INSERT INTO "user" (username, password, access_level)
    VALUES ($1, $2, $3) RETURNING id`;
	pool
		.query(queryText, [username, password, access_level])
		.then(() => res.sendStatus(201))
		.catch(err => {
			console.log('User registration failed: ', err);
			res.sendStatus(500);
		});
});

router.post('/login', userStrategy.authenticate('local'), (req, res) => {
	res.sendStatus(200);
});

router.post('/logout', (req, res) => {
	req.logout();
	res.sendStatus(200);
});

// ================================
// USER INFO ROUTES

// GET user scores
router.get('/scores', rejectUnauthenticated, async (req, res) => {

  try {
    const genreQuery = 'SELECT * FROM user_genres WHERE user_id = $1'
    const tagQuery = 'SELECT * FROM user_tags WHERE user_id = $1'

    const {rows: userGenreScores} = await pool.query(genreQuery, [req.user.id])
    const {rows: userTagScores} = await pool.query(tagQuery, [req.user.id])

    res.send({userGenreScores, userTagScores})
  } catch (err) {
    console.log('Failed to get user scores', err);
    res.sendStatus(500)
  }

})

module.exports = router;
