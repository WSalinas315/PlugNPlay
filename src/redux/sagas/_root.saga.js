import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user._saga';
import rawgSaga from './rawg.saga'
import surveySaga from './survey.saga';
import wishlistSaga from './user.wishlist.saga';
import ignorelistSaga from './user.ignorelist.saga';
import playedListSaga from './user.playedlist.saga';
import glossarySaga from './glossary.saga';

export default function* rootSaga() {
  yield all([
    loginSaga(),
    registrationSaga(),
    userSaga(),
    rawgSaga(),
    glossarySaga(),
    wishlistSaga(),
    ignorelistSaga(),
    playedListSaga(),
    surveySaga(),
  ]);
}
