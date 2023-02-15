import axios from "axios"
import { put, takeLatest } from "redux-saga/effects"
import { handleErrors } from "./user._saga";

// POSTs a new game to the logged in user's played games list, 
// removes it from their wishlist and fetches the new played games list
function* addToPlayedList({ payload }) {
  try {
    
    yield axios.post('/api/games/played', { gameID: payload })
    yield put({ type: 'USER/WISHLIST/DELETE', payload })
    yield put({ type: 'USER/FETCH_PLAYED_LIST' })
  } catch (err) {
    handleErrors('Adding to played list failed', err)
  }
}

// Deletes a game from the logged in user's played games list and fetches their played games list
function* deleteFromPlayedList({ payload }) {
  try {
    yield axios.delete('/api/games/played/' + payload)
    yield put({ type: 'USER/FETCH_PLAYED_LIST' })
  } catch (err) {
    handleErrors('Deleting from played list failed', err)
  }
}

// Updates a game's liked rating on their played games list for the logged in user 
// and fetches their played games list
function* likeOnPlayedList({ payload }) {
  try {
    yield axios.put('/api/games/played/' + payload.gameID, { liked: payload.liked })
    yield put({ type: 'USER/FETCH_PLAYED_LIST' })
  } catch (err) {
    handleErrors('Liking/disliking game failed', err)
  }
}

export default function* playedListSaga() {
  yield takeLatest('USER/PLAYEDLIST/ADD', addToPlayedList)
  yield takeLatest('USER/PLAYEDLIST/DELETE', deleteFromPlayedList)

  yield takeLatest('USER/PLAYEDLIST/HANDLE_LIKE', likeOnPlayedList)
}