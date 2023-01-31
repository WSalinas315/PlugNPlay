const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// ==========================================================================================
// GET ALL TAGS

router.get('/', async (req, res) => {
  try {
    const { data: tagResults } = await pool.query(`SELECT * FROM tag`)
    res.send(tagResults);
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
});

// ==========================================================================================
// GET TAG BY ID

router.get('/byID/:id', async (req, res) => {

  const { id } = req.params

  try {
    const { data: tag } = await pool.query(`SELECT * FROM tag WHERE id = $1`, [ id ])
    res.send(tag)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

module.exports = router;
