import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";
import { handleErrors } from "./user._saga";

// adds a game to the logged in user's ignored games list and fetches an updated ignored games list
function* addToIgnorelist({ payload }) {
  try {
    yield axios.post('/api/games/ignorelist', { gameID: payload })
    yield put({ type: 'USER/FETCH_IGNORELIST' })
  } catch (err) {
    handleErrors('Adding to ignore list failed', err)
  }
}

// deletes a game to the logged in user's ignored games list and fetches an updated ignored games list
function* deleteFromIgnorelist({ payload }) {
  try {
    yield axios.delete('/api/games/ignorelist/' + payload)
    yield put({ type: 'USER/FETCH_IGNORELIST' })
  } catch (err) {
    handleErrors('Deleting from ignore list failed', err)
  }
}

export default function* ignorelistSaga() {
  yield takeLatest('USER/IGNORELIST/ADD', addToIgnorelist)
  yield takeLatest('USER/IGNORELIST/DELETE', deleteFromIgnorelist)
}