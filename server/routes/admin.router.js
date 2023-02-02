const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();

/* 
  ADMIN GLOSSARY LIST ROUTES
*/

// Admin Glossary - GET by ID
router.get('/glossary/:id', rejectUnauthenticated, async (req, res) => {
  // console.log('In Admin router: Admin Glossary - GET by ID');
  try {
    const tagID = req.params.id;
    const glossaryResult = await pool.query(`SELECT * FROM "glossary" WHERE "tag_id" = $1;`, [tagID]);
    res.send(glossaryResult);
  } catch (err) {
    console.log('Admin Router Glossary GET by ID error:', err);
    res.sendStatus(500);
  }
});

// Admin Glossary - GET
router.get('/glossary', rejectUnauthenticated, async (req, res) => {
  // console.log('In Admin router: Admin Glossary - GET');
  try {
    const glossaryResult = await pool.query(`SELECT "tag_id", "term" FROM "glossary";`);
    res.send(glossaryResult);
  } catch (err) {
    console.log('Admin Router Glossary GET error:', err);
    res.sendStatus(500);
  }
});

// Admin Glossary - PUT by ID
router.put('/glossary/:id', rejectUnauthenticated, async (req, res) => {
  // console.log('In Admin router: Admin Glossary - PUT by ID');
  try {
    const tagID = req.params.id;
    const termUpdates = req.body;
    await pool.query(`UPDATE "glossary" SET "description" = $1, "img_path" = $2 
                      WHERE "tag_id" = $3`, [termUpdates.description, termUpdates.img_path, tagID]);
    res.sendStatus(200);
  } catch (err) {
    console.log('Admin Router Glossary PUT by ID error:', err);
    res.sendStatus(500);
  }
});

module.exports = router;
