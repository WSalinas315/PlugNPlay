import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

export const handleErrors = (msg, err) => {
  console.log(msg, err);
  alert('Error fetching data:' + msg)
}

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchUser() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get('/api/user', config);

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'SET_USER', payload: response.data });
  } catch (error) {
    if (error.response.status !== 403) {
      handleErrors('User get request failed', error);
    }
  }
}

function* fetchWishlist() {
  try {
    const { data: wishlist } = yield axios.get('/api/games/wishlist/')
    yield put({
      type: 'USER/SET_WISHLIST',
      payload: wishlist
    })
  } catch (err) {
    handleErrors('Fetch wishlist failed', err)
  }
}

function* fetchIgnorelist() {
  try {
    const { data: ignorelist } = yield axios.get('/api/games/ignorelist/')
    yield put({
      type: 'USER/SET_IGNORELIST',
      payload: ignorelist
    })
  } catch (err) {
    handleErrors('Fetch ignorelist failed', err)
  }
}

function* fetchPlayedList() {
  try {
    const { data: playedList } = yield axios.get('/api/games/played/')
    yield put({
      type: 'USER/SET_PLAYED_LIST',
      payload: playedList
    })
  } catch (err) {
    handleErrors('Fetch played list failed', err)
  }
}

function* fetchAllLists() {
  try {
    yield put({ type: 'USER/FETCH_WISHLIST' })
    yield put({ type: 'USER/FETCH_IGNORELIST' })
    yield put({ type: 'USER/FETCH_PLAYED_LIST' })
  } catch (err) {
    console.log('error fetching all lists');
  }
}

function* userSaga() {
  yield takeLatest('FETCH_USER', fetchUser);
  yield takeLatest('USER/FETCH_WISHLIST', fetchWishlist);
  yield takeLatest('USER/FETCH_IGNORELIST', fetchIgnorelist);
  yield takeLatest('USER/FETCH_PLAYED_LIST', fetchPlayedList);
  yield takeLatest('USER/FETCH_ALL_LISTS', fetchAllLists);
  
}

export default userSaga;
