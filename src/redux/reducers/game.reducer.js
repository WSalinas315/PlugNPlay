import { combineReducers } from "redux"

const currentlyViewedGame = (state = {}, { type, payload }) => {
  return {
    'GAME/SET_CURRENT': payload,
    'GAME/CLEAR_CURRENT': {},
    'GAME/CLEAR_ALL': {}
  }[type] || state
}

const searchResults = (state = [], { type, payload }) => {
  return {
    'GAME/SET_SEARCH_RESULTS': payload,
    'GAME/CLEAR_SEARCH_RESULTS': [],
    'GAME/CLEAR_ALL': []
  }[type] || state;
}

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
})