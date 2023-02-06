const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const gameRouter = require('./routes/game.router');
const rawgRouter = require('./routes/rawg.router');
const tagsRouter = require('./routes/tags.router');
const adminRouter = require('./routes/admin.router');
const surveyRouter = require('./routes/survey.router');
const glossaryRouter = require('./routes/glossary.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/games', gameRouter);
app.use('/api/rawg', rawgRouter);
app.use('/api/tags', tagsRouter);
app.use('/api/survey', surveyRouter);
app.use('/api/admin', adminRouter);
app.use('/api/glossary', glossaryRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
	console.log(`Listening on port: ${PORT}`);
});
