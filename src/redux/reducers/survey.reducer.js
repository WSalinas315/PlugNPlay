import { combineReducers } from "redux"

const surveyResults = (state = {}, { type, payload }) => {
    return {
      'SET_SURVEY_ANSWERS': {...payload},
    }[type] || state;
  } 
export default combineReducers({
    surveyResults
})