import { combineReducers } from "redux"

let survey = {
    q1: 5,
    q2: 5,
    q3: 5,
    q4: 5,
    q5: 5,
    q6: 5,
    q7: 5,
    q8: 5,
    q9: 5,
    q10: 5,
    q11: 5,
    q12: 5,
    q13: 5,
    q14: 5,
    q15: 5,
    q16: 5,
    q17: 5,
    q18: 'no',
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