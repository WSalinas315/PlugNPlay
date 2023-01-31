import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import games from './game.reducer';

const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  games, // contains data about games, including search results
});

export default rootReducer;
