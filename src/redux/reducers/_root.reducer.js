import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import games from './game.reducer';
import glossary from './glossary.reducer';

const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in, and data about user game lists
  games, // contains data about games, including search results
  glossary, // contains full glossary and the glossary items
});

export default rootReducer;
