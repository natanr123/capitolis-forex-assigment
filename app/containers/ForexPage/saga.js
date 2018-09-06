import axios from 'axios';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import * as actions from './actions';
import * as constants from './constants';


function fetchPositions() {
  return axios.get('/positions');
}

export function* loadPositionsWorker() {
  const response = yield call(fetchPositions);
  yield put(actions.positionsLoaded(response.data));
}

export default function* watcher() {
  yield takeLatest(constants.LOAD_POSITIONS, loadPositionsWorker);
}
