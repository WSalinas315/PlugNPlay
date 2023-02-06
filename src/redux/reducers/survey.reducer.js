import { combineReducers } from "redux"

let survey = [
    {
      "id": 1,
      "score": -0.50
    },
    {
      "id": 2,
      "score": -0.75
    },
    {
      "id": 3,
      "score": -0.75
    },
    {
      "id": 4,
      "score": 0.25
    },
    {
      "id": 5,
      "score": -0.25
    },
    {
      "id": 6,
      "score": -0.5
    },
    {
      "id": 7,
      "score": -0.5
    },
    {
      "id": 8,
      "score": -0.75
    },
    {
      "id": 9,
      "score": 0
    },
    {
      "id": 10,
      "score": 0.50
    },
    {
      "id": 11,
      "score": 0
    },
    {
      "id": 12,
      "score": -0.25
    },
    {
      "id": 13,
      "score": 0.25
    },
    {
      "id": 14,
      "score": -0.50
    },
    {
      "id": 15,
      "score": 0.25
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

const surveyResults = (state = survey, { type, payload }) => {
    return {
      'SET_SURVEY_ANSWERS': [...state, payload],
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