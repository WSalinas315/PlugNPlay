import { combineReducers } from 'redux';

// loginMessage holds the string that will display
// on the login screen if there's an error
const loginMessage = (state = '', { type }) => {

  return {
    'CLEAR_LOGIN_ERROR': '',
    'LOGIN_INPUT_ERROR': 'Enter your username and password!',
    'LOGIN_FAILED': 'The username and password didn\'t match. Try again?',
    'LOGIN_FAILED_NO_CODE': 'Something went wrong; is the server running?'
  }[type] || state

};

// registrationMessage holds the string that will display
// on the registration screen if there's an error
const registrationMessage = (state = '', { type }) => {

  return {
    'CLEAR_REGISTRATION_ERROR': '',
    'REGISTRATION_INPUT_ERROR': 'Choose a username and password.',
    'REGISTRATION_FAILED': 'Registration failed; the username may already be taken.'
  }[type] || state

};

export default combineReducers({
  loginMessage,
  registrationMessage,
});
