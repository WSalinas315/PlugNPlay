import axios from "axios"
import { put, takeLatest } from "redux-saga/effects"
import { handleErrors } from "./user.saga";

function* addToPlayedList({ payload }) {
  try {
    yield axios.post('/api/played', payload)
    yield put({ type: 'USER/FETCH_PLAYED_LIST' })
  } catch (err) {
    handleErrors('Adding to played list failed', err)
  }
}

function* deleteFromPlayedList({ payload }) {
  try {
    yield axios.delete('/api/played/' + payload)
    yield put({ type: 'USER/FETCH_PLAYED_LIST' })
  } catch (err) {
    handleErrors('Deleting from played list failed', err)
  }
}

export default function* playedListSaga() {
  yield takeLatest('USER/PLAYEDLIST/ADD', addToPlayedList)
  yield takeLatest('USER/PLAYEDLIST/DELETE', deleteFromPlayedList)
}