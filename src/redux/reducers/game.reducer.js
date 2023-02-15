import { combineReducers } from "redux"

// stores data for the game being viewed
const currentlyViewedGame = (state = {}, { type, payload }) => {
  return {
    'GAME/SET_CURRENT': payload,
    'GAME/CLEAR_CURRENT': {},
    'GAME/CLEAR_ALL': {}
  }[type] || state
}

// stores data for search results
const searchResults = (state = [], { type, payload }) => {
  return {
    'GAME/SET_SEARCH_RESULTS': payload,
    'GAME/CLEAR_SEARCH_RESULTS': [],
    'GAME/CLEAR_ALL': []
  }[type] || state;
}

// stores a list of game genres
const genreList = (state = [], { type, payload }) => {
  return {
    'GAME/SET_GENRE_LIST': payload,
    'GAME/CLEAR_GENRE_LIST': []
  }[type] || state;
}

// stores data for the user's current recommendations
const recommendations = (state = [], { type, payload }) => {
  return {
    'GAME/SET_RECOMMENDATIONS': payload,
    'GAME/SWIPE_WISHLIST': payload,
    'GAME/SWIPE_SKIP': payload,
    'GAME/CLEAR_RECOMMENDATIONS': [],
    'GAME/CLEAR_ALL': []
  }[type] || state;
}

export default combineReducers({
  currentlyViewedGame,
  searchResults,
  recommendations,
  genreList,
})