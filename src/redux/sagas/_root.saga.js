import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import rawgSaga from './rawg.saga'
import wishlistSaga from './user.wishlist.saga';
import ignorelistSaga from './user.ignorelist.saga';
import playedListSaga from './user.playedlist.saga';

export default function* rootSaga() {
  yield all([
    loginSaga(),
    registrationSaga(),
    userSaga(),
    rawgSaga(),
    wishlistSaga(),
    ignorelistSaga(),
    playedListSaga(),
  ]);
}
