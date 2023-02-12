import { combineReducers } from "redux"

let survey = [
    {
      "id": 1,
      "score": 0
    },
    {
      "id": 2,
      "score": 0
    },
    {
      "id": 3,
      "score": 0
    },
    {
      "id": 4,
      "score": 0
    },
    {
      "id": 5,
      "score": 0
    },
    {
      "id": 6,
      "score": 0
    },
    {
      "id": 7,
      "score": 0
    },
    {
      "id": 8,
      "score": 0
    },
    {
      "id": 9,
      "score": 0
    },
    {
      "id": 10,
      "score": 0
    },
    {
      "id": 11,
      "score": 0
    },
    {
      "id": 12,
      "score": 0
    },
    {
      "id": 13,
      "score": 0
    },
    {
      "id": 14,
      "score": 0
    },
    {
      "id": 15,
      "score": 0
    },
    {
      "id": 16,
      "score": -1
    },
    {
      "id": 17,
      "score": -1
    }
  ]


  function replaceAt(arr, index, value){
    const ret = arr.slice(0);
    ret[index] = value;
    return ret;
  }

const surveyResults = (state = survey, { type, payload }) => {
    return {
      'SET_SURVEY_ANSWERS': replaceAt(state, payload?.id - 1, payload),
      'AUTOFILL_SURVEY': payload
    }[type] || state;
}

const surveyQuestions = (state = [], { type, payload }) => {
  return {
    'SURVEY/SET_QUESTIONS': payload
  }[type] || state;
}

export default combineReducers({
    surveyResults,
    surveyQuestions,
})