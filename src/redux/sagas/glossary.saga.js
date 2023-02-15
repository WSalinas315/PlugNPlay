import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import { handleErrors } from './user._saga';

// fetches the glossary from the database and updates the glossary reducer
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

// fetches a specific glossary term and updates the glossary reducer
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

// adds a new term to the glossary, fetches the updated glossary and sets the glossary reducer
function* PostGlossaryTerm({ payload }) {
	try {
		console.log('Payload in glossary saga', payload);
		yield axios.post('/api/glossary/Add/Term', payload);
		const { data: glossary } = yield axios.get('/api/glossary');
		yield put({
			type: 'GLOSSARY/SET',
			payload: glossary,
		});
	} catch (error) {
		handleErrors('Posting new glossary term failed', error);
	}
}

// deletes a term to the glossary, fetches the updated glossary and sets the glossary reducer
function* DeleteGlossaryTerm({ payload }) {
	try {
		console.log('Payload in DeleteGlossaryTerm: ', payload);
		yield axios.delete(`/api/glossary/delete/${payload.id}`);

		const { data: glossary } = yield axios.get('/api/glossary');
		yield put({
			type: 'GLOSSARY/SET',
			payload: glossary,
		});
	} catch (error) {
		handleErrors('Deleting term from glossary failed', error);
	}
}

// updates a glossary term
function* EditGlossaryTerm({ payload }) {
	try {
		console.log('Payload in EditGlossary Saga: ', payload);
		yield axios.post('/api/glossary/edit/' + payload.id, payload);
	} catch (error) {
		handleErrors('Editing term from glossary failed', error);
	}
}

export default function* glossarySaga() {
	yield takeLatest('GLOSSARY/FETCH', fetchGlossary);
	yield takeLatest('GLOSSARY/FETCH_TERM', fetchGlossaryTerm);
	yield takeLatest('GLOSSARY/SET_NEW_TERM', PostGlossaryTerm);
	yield takeLatest('GLOSSARY/DELETE_TERM', DeleteGlossaryTerm);
	yield takeLatest('GLOSSARY/EDIT_TERM', EditGlossaryTerm);
}
