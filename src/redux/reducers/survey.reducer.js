import { combineReducers } from "redux"

let survey = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
    11: 0,
    12: 0,
    13: 0,
    14: 0,
    15: 0,
    16: 'no',
    17: 'no'
}
const surveyResults = (state = survey, { type, payload }) => {
    return {
      'SET_SURVEY_ANSWERS': {...state, ...payload},
    }[type] || state;
  } 
export default combineReducers({
    surveyResults
})