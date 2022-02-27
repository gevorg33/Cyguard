import { all, fork, put, takeLatest } from 'redux-saga/effects';
import * as types from './types';
import UserApi from 'api/user-api';
import SignUpApi from 'api/sign-up-api';
import axios from 'axios';
import UIHelper from '../../services/ui-helper';
import { message } from 'antd';

const api = new UserApi();
const signUpApi = new SignUpApi();

function* getUserRequest() {
  try {
    const { data } = yield api.get('me', {});
    yield put({
      type: types.GET_USER_REQUEST_SUCCESS,
      payload: data,
    });
  } catch (e) {
    console.log(e.message);
  }
}

function* createGeneralInfo({ payload }: any) {
  const { data, next } = payload;
  try {
    yield signUpApi.create('step1', { data });
    yield put({
      type: types.SET_SIGN_UP_DATA_STEP_1_SUCCESS,
      payload: data,
    });
    next();
  } catch (e) {
    yield put({
      type: types.SET_SIGN_UP_DATA_STEP_1_FAILURE,
      payload: e?.response?.data,
    });
    message.error(e?.response?.data?.message);
  }
}

function* createUserPassword({ payload }: any) {
  const { data, next } = payload;
  try {
    yield signUpApi.create('step2', { data });
    yield put({
      type: types.SET_SIGN_UP_DATA_STEP_2_SUCCESS,
      payload: data,
    });
    next();
  } catch (e) {
    yield put({
      type: types.SET_SIGN_UP_DATA_STEP_2_FAILURE,
      payload: e?.response?.data,
    });
    console.log(e.message);
  }
}

function* completeUserRequest({ payload }: any) {
  try {
    yield signUpApi.create('step3', { data: payload });
    yield put({
      type: types.SET_SIGN_UP_DATA_STEP_3_SUCCESS,
    });
    message.success('We have sent the verification link to your Email!');
  } catch (e) {
    yield put({
      type: types.SET_SIGN_UP_DATA_STEP_3_FAILURE,
      payload: e?.response?.data,
    });
    message.error(e?.response?.data?.message);
  }
}

function* updateUserDataRequest({ payload }: any) {
  try {
    yield api.put('update', { data: payload });
    yield put({
      type: types.UPDATE_USER_DATA_SUCCESS,
      payload,
    });
    UIHelper.success({
      message: 'Issuer Name has been updated!',
    });
  } catch (e) {
    yield put({
      type: types.UPDATE_USER_DATA_FAILURE,
      payload: e?.response?.data?.data,
    });
  }
}

function* updateUserCompanyDataRequest({ payload }: any) {
  try {
    yield api.put('update', { data: payload });
    yield put({
      type: types.UPDATE_USER_COMPANY_DATA_SUCCESS,
      payload,
    });
    UIHelper.success({
      message: 'Company Details have been updated!',
    });
  } catch (e) {
    yield put({
      type: types.UPDATE_USER_COMPANY_DATA_FAILURE,
      payload: e?.response?.data?.data,
    });
  }
}

function* setUserConfirmation({ payload }: any) {
  try {
    yield axios.post(
      `${process.env.REACT_APP_API_URL}auth/confirm-user`,
      payload,
    );
    yield put({
      type: types.SIGN_UP_CONFIRMED_SUCCESS,
    });
    UIHelper.success({
      message: 'Your Email has been verified!',
    });
  } catch (e) {
    yield put({
      type: types.SIGN_UP_CONFIRMED_FAILURE,
      payload: e?.response?.data,
    });
  }
}

function* watchGetUserRequestMethod() {
  yield takeLatest(types.GET_USER_REQUEST, getUserRequest);
}

function* watchSetUserConfirmation() {
  yield takeLatest(types.SIGN_UP_CONFIRMED, setUserConfirmation);
}

function* watchUpdateUserDataRequest() {
  yield takeLatest(types.UPDATE_USER_DATA_REQUEST, updateUserDataRequest);
}

function* watchUpdateUserCompanyDataRequest() {
  yield takeLatest(types.UPDATE_USER_COMPANY_DATA_REQUEST, updateUserCompanyDataRequest);
}

function* watchCreateGeneralInfoRequest() {
  yield takeLatest(types.SET_SIGN_UP_DATA_STEP_1, createGeneralInfo);
}

function* watchCreateUserPasswordRequest() {
  yield takeLatest(types.SET_SIGN_UP_DATA_STEP_2, createUserPassword);
}

function* watchCompleteUserRequest() {
  yield takeLatest(types.SET_SIGN_UP_DATA_STEP_3, completeUserRequest);
}

export default function* rootSaga() {
  yield all([fork(watchGetUserRequestMethod)]);
  yield all([fork(watchSetUserConfirmation)]);
  yield all([fork(watchUpdateUserDataRequest)]);
  yield all([fork(watchUpdateUserCompanyDataRequest)]);
  yield all([fork(watchCreateGeneralInfoRequest)]);
  yield all([fork(watchCreateUserPasswordRequest)]);
  yield all([fork(watchCompleteUserRequest)]);
}
