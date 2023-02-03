import { combineReducers } from "redux"

let survey = {
    q1: 0,
    q2: 0,
    q3: 0,
    q4: 0,
    q5: 0,
    q6: 0,
    q7: 0,
    q8: 0,
    q9: 0,
    q10: 0,
    q11: 0,
    q12: 0,
    q13: 0,
    q14: 0,
    q15: 0,
    q16: 0,
    q17: 0,
    q18: 0,
    q19: 'no',
    q20: 'yes',
}
const surveyResults = (state = survey, { type, payload }) => {
    return {
      'SET_SURVEY_ANSWERS': {...state, ...payload},
    }[type] || state;
  } 
export default combineReducers({
    surveyResults
})