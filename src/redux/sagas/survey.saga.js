import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import { handleErrors } from './user._saga';

// axios for survey/algorithm

function* postSurveyData({payload}) {
  try {
    yield axios.post('/api/games/survey', payload)
  } catch (err) {
    handleErrors('Failed to post survey data', err);
  }
}


export default function* surveySaga() {
  yield takeLatest('SURVEY/POST_DATA', postSurveyData)
};
