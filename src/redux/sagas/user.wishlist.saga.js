import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";
import { handleErrors } from "./user._saga";

function* addToWishlist({ payload }) {
  try {
    console.log('in saga:', payload);
    yield axios.post('/api/games/wishlist', { gameID: payload });
    yield put({ type: 'USER/FETCH_WISHLIST' })
  } catch (err) {
    handleErrors('Adding game to wishlist failed', err)
  }
}

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