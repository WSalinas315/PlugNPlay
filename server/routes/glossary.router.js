const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

const {
	rejectUnauthenticated,
} = require('../modules/authentication-middleware');

// ==========================================================================================
// GET ALL TERMS FROM THE GLOSSARY TABLE BY TERM IN ASCENDING ORDER.
router.get('/', rejectUnauthenticated, async (req, res) => {
	try {
		const glossary = await pool.query(
			`SELECT * FROM "glossary" ORDER BY term asc;`
		);
		res.send(glossary.rows);
	} catch (err) {
		console.log('Error getting glossary term from database.', err);
		res.sendStatus(500);
	}
});

// ==========================================================================================
// GET INDIVIDUAL TERM FROM GLOSSARY BY ID
router.get('/term/:stringTerm', rejectUnauthenticated, async (req, res) => {
	try {
		const { stringTerm } = req.params;
		const sqlText = `SELECT * FROM "glossary" WHERE "term" = $1;`;
		const glossaryTerm = await pool.query(sqlText, [stringTerm]);
		res.send(glossaryTerm.rows);
	} catch (err) {
		console.log('Error getting glossary term from database.', err);
		res.sendStatus(500);
	}
});

// ==========================================================================================
// POST AN UPDATE TO THE TERMS DESCRIPTION
router.post('/edit/:termId', rejectUnauthenticated, async (req, res) => {
	const { termId } = req.params; //the term being changed
  const { description, img_path } = req.body;

	const sqlText = `UPDATE "glossary" 
									SET "description" = $1, "img_path" = $2
									WHERE id = $3;`;
	try {
		pool.query(sqlText, [description, img_path, termId]);
		console.log('Successfully Updated ', req.body.term, ' from the database');
		res.sendStatus(200);
	} catch (error) {
		console.log('Error in Glossary Router', error);
		res.sendStatus(500);
	}
});

// ==========================================================================================
//DELETE A SELECTED TERM FROM THE GLOSSARY TABLE BY TERM ID.
router.delete('/delete/:termId', rejectUnauthenticated, (req, res) => {
	const glossaryTerm = req.params.termId;

	const sqlText = `DELETE FROM "glossary" WHERE "id" = $1;`;

	try {
		pool.query(sqlText, [glossaryTerm]).then(() => {
			console.log('Successfully Deleted term from Glossary Table');
			res.sendStatus(200);
		});
	} catch (error) {
		console.log('Error in Glossary Router', error);
		res.sendStatus(500);
	}
});

// ==========================================================================================
// ADD A NEW TERM TO THE GLOSSARY
router.post('/Add/Term', rejectUnauthenticated, (req, res) => {
	const term = req.body.term;
	const definition = req.body.definition;
	const imagePath = req.body.imagePath;

	const sqlText = `INSERT INTO "glossary" ("term", "description", "img_path") VALUES ($1,$2,$3); `;

	try {
		pool.query(sqlText, [term, definition, imagePath]);
		console.log('Successfully Added a new term to Database');
		res.sendStatus(201);
	} catch (error) {
		console.log(
			'Error in adding term to the Glossary Table in Database!',
			error
		);
		res.sendStatus(500);
	}
});

module.exports = router;
