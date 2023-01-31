const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// ==========================================================================================
// GET ALL TAGS

router.get('/', async (req, res) => {
  try {
    const { rows: tagResults } = await pool.query(`SELECT * FROM tag`)
    res.send(tagResults);
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
});

// ==========================================================================================
// GET TAG BY ID

router.get('/:id', async (req, res) => {

  const { id } = req.params

  try {
    const { rows: tag } = await pool.query(`SELECT * FROM tag WHERE id = $1`, [ id ])
    res.send(tag)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

module.exports = router;
