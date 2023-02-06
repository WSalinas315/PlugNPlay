const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

const {
	rejectUnauthenticated,
} = require('../modules/authentication-middleware');

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

// POST AN UPDATE TO THE TERMS DESCRIPTION
router.post('/edit/:termId', rejectUnauthenticated, async (req, res) => {
	const termId = req.params.termId; //the term being changed
	console.log('Term being edited: ', glossaryTerm);
	const description = req.body;

	const sqlText = `UPDATE "glossary" 
									SET "description" = $1
									WHERE id = $2;`;

	try {
		pool.query(sqlText, [description, termId]);
		console.log('Successfully Updated definition');
		res.sendStatus(200);
	} catch (error) {
		console.log('Error in Glossary Router', error);
		res.sendStatus(500);
	}
});

//DELETE A SELECTED TERM FROM THE GLOSSARY TABLE BY TERM ID.
router.delete('/delete/:termId', rejectUnauthenticated, (req, res) => {
	const glossaryTerm = req.params;
	console.log('Term being removed: ', glossaryTerm);

	const sqlText = `DELETE FROM "glossary WHERE term = $1;`;

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

router.put('/Add/Term', rejectUnauthenticated, (req, res) => {
	const term = req.body.term;
	const description = req.body.description;
	const imagePath = req.body.imagepath;

	const sqlText = `INSERT INTO "glossary" ("term", "description", "img_path" VALUES ($1,$2,$3); `;

	try {
		pool.query(sqlText, [term, description, imagePath]);
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
