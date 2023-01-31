import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

// HELPER FUNCTIONS
const setSearchResults = (results) => {
  put({ type: 'GAME/SET_SEARCH_RESULTS', payload: results })
}

const handleErrors = (msg, err) => {
  console.log(msg, err);
  alert('Error fetching data.')
}

// FETCH GAME FROM RAWG BY ID
function* fetchByID({ payload }) {
  try {
    const { data: current } = yield axios.get('api/rawg/byID/' + payload)
    yield put({
      type: 'GAME/SET_CURRENT',
      payload: current
    })
  } catch (err) {
    handleErrors('Fetching from Rawg by ID', err)
  }
}

// SEARCH RAWG BY NAME
function* searchByName({ payload }) {
  try {
    const { data: results } = yield axios.get('api/rawg/byName/' + payload)
    yield setSearchResults(results)
  } catch (err) {
    handleErrors('Searching RAWG by name failed', err)
  }
}

// SEARCH RAWG BY TAGS
function* searchByTags({ payload }) {
  try {
    const { data: results } = yield axios.get('api/rawg/byTags')
    yield setSearchResults(results)
  } catch (err) {
    handleErrors('Searching RAWG by tags failed', err);
  }
}

export default function* gamesSaga() {
  yield takeLatest('RAWG/FETCH_CURRENT_GAME', fetchByID)
  yield takeLatest('RAWG/SEARCH_BY_NAME', searchByName)
  yield takeLatest('RAWG/SEARCH_BY_TAGS', searchByTags)
}