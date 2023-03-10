import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

const handleErrors = (msg, err) => {
  console.log(msg, err);
  alert('Error fetching data.');
}

// FETCH GAME FROM RAWG BY ID
function* fetchByID({ payload }) {
  try {
    const { data: current } = yield axios.get('api/rawg/byID/' + payload);
    yield put({
      type: 'GAME/SET_CURRENT',
      payload: current
    });
  } catch (err) {
    handleErrors('Fetching from Rawg by ID', err);
  }
}

// SEARCH RAWG BY NAME
function* searchByName({ payload }) {
  try {
    const { data: results } = yield axios.get('api/rawg/byName/' + payload);
    yield put({ type: 'GAME/SET_SEARCH_RESULTS', payload: results });
  } catch (err) {
    handleErrors('Searching RAWG by name failed', err);
  }
}

// SEARCH RAWG BY Genre
function* genreSearch({ payload }) {
  try {
    const { data: results } = yield axios.get('api/rawg/byGenre/' + payload);
    yield put({ type: 'GAME/SET_SEARCH_RESULTS', payload: results });
  } catch (err) {
    handleErrors('Searching RAWG by name failed', err);
  }
}

// SEARCH RAWG BY TAGS
function* searchByTags({ payload }) {
  try {
    const { data: results } = yield axios.get('api/rawg/byTags');
    yield setSearchResults(results);
  } catch (err) {
    handleErrors('Searching RAWG by tags failed', err);
  }
}

// SEARCH RAWG BY GENRE
function* searchByGenre({ payload }) {
  try {
    const { data: results } = yield axios.get('api/rawg/byGenre');
    yield put({ type: 'GAME/SET_RECOMMENDATIONS', payload: results });
  } catch (err) {
    handleErrors('Searching RAWG by Genre failed', err);
  }
}

// FETCH GENRE LIST FROM RAWG
function* fetchGenreList({ payload }) {
  try {
    const { data: results } = yield axios.get('api/rawg/genreList');
    // console.log('INFO ON GENRE LIST BACK FROM RAWG:', results);
    yield put({ type: 'GAME/SET_GENRE_LIST', payload: results });
  } catch (err) {
    handleErrors('Searching RAWG by Genre failed', err);
  }
}

export default function* rawgSaga() {
  yield takeLatest('RAWG/FETCH_CURRENT_GAME', fetchByID);
  yield takeLatest('RAWG/SEARCH_BY_NAME', searchByName);
  yield takeLatest('RAWG/SEARCH_BY_GENRE', genreSearch);//
  yield takeLatest('RAWG/SEARCH_BY_TAGS', searchByTags);
  yield takeLatest('RAWG/FETCH_RECOMMENDATIONS', searchByGenre);
  yield takeLatest('RAWG/FETCH_GENRE_LIST', fetchGenreList);
}