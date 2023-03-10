import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";
import { handleErrors } from "./user._saga";

// POSTs game to user's wishlist and fetches the new wishlist
function* addToWishlist({ payload }) {
  try {
    console.log('in saga:', payload);
    yield axios.post('/api/games/wishlist', { gameID: payload });
    yield put({ type: 'USER/FETCH_WISHLIST' })
  } catch (err) {
    handleErrors('Adding game to wishlist failed', err)
  }
}

// Deletes a game from the user's wishlist and fetches the new wishlist
function* deleteFromWishlist({ payload }) {
  try {
    yield axios.delete('/api/games/wishlist/' + payload);
    yield put({ type: 'USER/FETCH_WISHLIST' })
  } catch (err) {
    handleErrors('Deleting from wishlist failed', err)
  }
}

export default function* wishlistSaga() {
  yield takeLatest('USER/WISHLIST/ADD', addToWishlist)
  yield takeLatest('USER/WISHLIST/DELETE', deleteFromWishlist)
}