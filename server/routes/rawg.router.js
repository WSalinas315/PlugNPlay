const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

const { rejectUnauthenticated } = require('../modules/authentication-middleware')

const key = process.env.RAWG_API_KEY;
const keyUrl = ("key=" + key);

/*
  GET:
  main recommendations
  game by ID √
  games by genre √
  games by tag
  games by name
*/

router.get('/byID/:id', async (req, res) => {

  const { id } = req.params;

  try {
    const game = await axios.get(`https://api.rawg.io/api/games/${id}?${keyUrl}`)
    res.send(game.data)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }

});

router.get('/byGenre/:genre', async (req, res) => {

  const { genre } = req.params;

  console.log('searching for genre', genre, '...');
  try {
    const games = await axios.get(`https://api.rawg.io/api/games?genres=${genre}&${keyUrl}`)
    res.send(games.data)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})



module.exports = router;
