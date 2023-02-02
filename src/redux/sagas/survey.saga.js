import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import { handleErrors } from './user._saga';

// axios for survey/algorithm

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
  yield takeLatest('SURVEY/POST_DATA', postSurveyData)
};
