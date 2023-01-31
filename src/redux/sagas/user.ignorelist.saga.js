import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";
import { handleErrors } from "./user.saga";

function* addToIgnorelist({ payload }) {
  try {
    yield axios.post('/api/ignorelist', payload)
    yield put({ type: 'USER/FETCH_IGNORELIST' })
  } catch (err) {
    handleErrors('Adding to ignore list failed', err)
  }
}

function* deleteFromIgnorelist({ payload }) {
  try {
    yield axios.delete('/api/ignorelist/' + payload)
    yield put({ type: 'USER/FETCH_IGNORELIST' })
  } catch (err) {
    handleErrors('Deleting from ignore list failed', err)
  }
}

export default function* ignorelistSaga() {
  yield takeLatest('USER/IGNORELIST/ADD', addToIgnorelist)
  yield takeLatest('USER/IGNORELIST/DELETE', deleteFromIgnorelist)
}