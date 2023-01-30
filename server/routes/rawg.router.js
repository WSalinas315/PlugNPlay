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

router.get('/byTags', async (req, res) => {

  const { userTags } = req.body;
  const searchQueries = []

  // HELPER FUNCTIONS
  //* function to filter out duplicate results
  const dupeFilter = (obj, idx, arr) => {
    return idx === arr.findIndex((game) => {
      return game.name === obj.name && game.id === obj.id
    })
  }

  const tagFilter = (game) => {
    //* filters out non-english tags, isolates the tag name, and sorts alphabetically
    const gameTags =
      game.tags
        .filter(tag => tag.language === "eng")
        .map(tag => tag.name)
        .sort()

    //* isolate properties we want to see
    return {
      name: game.name,
      id: game.id,
      metacritic: game.metacritic,
      tags: gameTags.map(tag => tag.toLowerCase())
    }
  }

  // QUERY
  try {

    for (let tag of userTags) {
      searchQueries.push(axios.get(`https://api.rawg.io/api/games?${keyUrl}&tags=${tag.toLowerCase()}&page_size=40`))
      searchQueries.push(axios.get(`https://api.rawg.io/api/games?${keyUrl}&tags=${tag.toLowerCase()}&page_size=40&page=2`))
      searchQueries.push(axios.get(`https://api.rawg.io/api/games?${keyUrl}&tags=${tag.toLowerCase()}&page_size=40&page=3`))
    }

    const taggedGameObjects = await Promise.all(searchQueries)

    const taggedGames =
      taggedGameObjects
        .map(obj => obj.data.results)
        .flat()
        .filter(dupeFilter)
        .map(tagFilter)
        .sort((a, b) => {
          return b.tags.filter(tag => userTags.includes(tag.toLowerCase())).length -
            a.tags.filter(tag => userTags.includes(tag.toLowerCase())).length
        })

    res.send(taggedGames)
  } catch (err) {

    console.log(err)
    res.sendStatus(500)
  }

})

module.exports = router;
