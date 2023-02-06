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

function* fetchGlossaryItem({ payload }) {
	try {
		const { data: glossaryItem } = yield axios.get('/api/glossary/' + payload);
		yield put({
			type: 'GLOSSARY/SET_ITEM',
			payload: glossaryItem,
		});
	} catch (err) {
		handleErrors('Fetching glossary item failed', err);
	}
}

export default function* glossarySaga() {
	yield takeLatest('GLOSSARY/FETCH', fetchGlossary);
	yield takeLatest('GLOSSARY/FETCH_ITEM', fetchGlossaryItem);
}
