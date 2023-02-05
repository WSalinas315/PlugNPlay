import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import { handleErrors } from './user._saga';

// Get survey questions from database
function* fetchSurvey() {
  try {
    const { data: surveyQuestions } = yield axios.get('/api/survey/')
    yield put({
      type: 'SURVEY/SET_QUESTIONS',
      payload: surveyQuestions
    })
  } catch (err) {
    handleErrors('Failed to fetch survey data', err)
  }
}

// Sends survey answers, server converts into tag & genre scores
function* postSurveyData({payload}) {
  console.log('in postsurveydata');
  try {
    yield axios.post('/api/games/survey', payload)
    console.log('axios: survey post successful');
  } catch (err) {
    handleErrors('Failed to post survey data', err);
  }
}

export default function* surveySaga() {
  yield takeLatest('SURVEY/FETCH', fetchSurvey)
  yield takeLatest('SURVEY/POST_DATA', postSurveyData)
};
