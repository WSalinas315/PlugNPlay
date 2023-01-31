import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";
import { handleErrors } from "./user.saga";

function* addToWishlist({ payload }) {
  try {
    yield axios.post('/api/wishlist', payload);
    yield put({ type: 'USER/FETCH_WISHLIST' })
  } catch (err) {
    handleErrors('Adding game to wishlist failed', err)
  }
}

function* deleteFromWishlist({ payload }) {
  try {
    yield axios.delete('/api/wishlist/' + payload);
    yield put({ type: 'USER/FETCH_WISHLIST' })
  } catch (err) {
    handleErrors('Deleting from wishlist failed', err)
  }
}

export default function* wishlistSaga() {
  yield takeLatest('USER/WISHLIST/ADD', addToWishlist)
  yield takeLatest('USER/WISHLIST/DELETE', deleteFromWishlist)
}