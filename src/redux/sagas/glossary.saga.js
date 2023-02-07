import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import { handleErrors } from './user._saga';

function* fetchGlossary() {
	try {
		const { data: glossary } = yield axios.get('/api/glossary');
		yield put({
			type: 'GLOSSARY/SET',
			payload: glossary,
		});
	} catch (err) {
		handleErrors('Fetching glossary failed', err);
	}
}

// function* fetchGlossaryItem({ payload }) {
// 	try {
// 		const { data: glossaryItem } = yield axios.get('/api/glossary/' + payload);
// 		yield put({
// 			type: 'GLOSSARY/SET_ITEM',
// 			payload: glossaryItem,
// 		});
// 	} catch (err) {
// 		handleErrors('Fetching glossary item failed', err);
// 	}
// }

function* fetchGlossaryTerm(action) {
	try {
		console.log('payload: ', action.payload);
		const glossaryTerm = yield axios.get(
			'/api/glossary/term/' + action.payload
		);

		yield put({
			type: 'GLOSSARY/SET_ITEM',
			payload: glossaryTerm.data,
		});
	} catch (error) {
		handleErrors('Fetching glossary item failed', error);
	}
}

function* PostGlossaryTerm({ payload }) {
	try {
		console.log('Payload in glossary saga', payload);
		yield axios.post('/api/glossary/Add/Term', payload);
	} catch (error) {
		handleErrors('Posting new glossary term failed', error);
	}
}

export default function* glossarySaga() {
	yield takeLatest('GLOSSARY/FETCH', fetchGlossary);
	yield takeLatest('GLOSSARY/FETCH_TERM', fetchGlossaryTerm);
	yield takeLatest('GLOSSARY/SET_NEW_TERM', PostGlossaryTerm);
}
