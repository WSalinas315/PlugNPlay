import { combineReducers } from "redux"

const currentlyViewedGame = (state = {}, { type, payload }) => {
  return {
    'GAME/SET_CURRENT': payload,
    'GAME/CLEAR_CURRENT': {}
  }[type] || state
}

const searchResults = (state = [], { type, payload }) => {
  return {
    'GAME/SET_SEARCH_RESULTS': payload,
    'GAME/CLEAR_SEARCH_RESULTS': []
  }[type] || state;
}

const recommendations = (state = [], { type, payload }) => {
  return {
    'GAME/SET_RECOMMENDATIONS': payload,
    'GAME/CLEAR_RECOMMENDATIONS': []
  }[type] || state;
}

export default combineReducers({
  currentlyViewedGame,
  searchResults,
  recommendations,
})