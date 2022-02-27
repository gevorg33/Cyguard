import { all, fork, put, takeLatest } from 'redux-saga/effects';
import Auth from '../../services/auth';
import axios from 'axios';
import * as types from './types';

function* getTeamMembersRequest({ payload }: any) {
  const { limit, page } = payload;
  try {
    const { data } = yield axios.get(
      `${process.env.REACT_APP_API_URL}users/team-members?limit=${limit}&page=${page}`,
      Auth.authConfig(),
    );
    yield put({
      type: types.GET_TEAM_MEMBERS_SUCCESS,
      payload: data,
    });
  } catch (e) {
    yield put({
      type: types.GET_TEAM_MEMBERS_FAILURE,
      payload: e?.response?.data?.data,
    });
  }
}

function* watchGetTeamMembersMethod() {
  yield takeLatest(types.GET_TEAM_MEMBERS_REQUEST, getTeamMembersRequest);
}

export default function* rootSaga() {
  yield all([fork(watchGetTeamMembersMethod)]);
}