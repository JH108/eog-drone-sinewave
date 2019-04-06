import { delay } from 'redux-saga';
import {
	takeEvery,
	takeLatest,
	call,
	put,
	cancel,
	all,
} from 'redux-saga/effects';
import API from '../api';
import * as actions from '../actions';

function* pollDroneData(action) {
	// Delay calling the api for 4 seconds so data is refreshed after a new entry has been made
	yield call(delay, 4000);
	const { error, data } = yield call(API.getDroneData);
	if (error) {
		console.log({ error });
		yield put({ type: actions.API_ERROR, code: error.code });
		// If there was an error still poll the data again
		yield put({ type: actions.POLL_DRONE_DATA });
		yield cancel();
		return;
	}

	yield put({ type: actions.DRONE_DATA_RECEIVED, droneData: data });
	yield put({ type: actions.POLL_DRONE_DATA });
}

function* watchFetchDroneData(action) {
	const { error, data } = yield call(API.getDroneData);
	if (error) {
		console.log({ error });
		yield put({ type: actions.API_ERROR, code: error.code });
		yield cancel();
		return;
	}
	yield put({ type: actions.DRONE_DATA_RECEIVED, droneData: data });
	// Start polling the api for drone data after initial data has been fetched
	yield put({ type: actions.POLL_DRONE_DATA });
}

function* watchAppLoad() {
	yield all([takeEvery(actions.FETCH_DRONE_DATA, watchFetchDroneData)]);
	yield takeLatest(actions.POLL_DRONE_DATA, pollDroneData);
}

export default [watchAppLoad];
