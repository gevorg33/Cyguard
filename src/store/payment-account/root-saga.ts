import { all, debounce, fork, put, takeLatest } from 'redux-saga/effects';
import Auth from '../../services/auth';
import axios from 'axios';
import * as types from './types';

function* getPaymentAccountsRequest({ payload }: any) {
  const { limit, page } = payload;
  try {
    const { data } = yield axios.get(
      `${process.env.REACT_APP_API_URL}payment-accounts?paged=true&limit=${limit}&page=${page}`,
      Auth.authConfig(),
    );
    yield put({
      type: types.GET_PAYMENT_ACCOUNTS_REQUEST_SUCCESS,
      payload: data,
    });
  } catch (e) {
    yield put({
      type: types.GET_PAYMENT_ACCOUNTS_REQUEST_FAILURE,
      payload: e?.response?.data?.data,
    });
  }
}

function* getFilteredPaymentAccountsRequest({ payload }: any) {
  try {
    if (payload.trim()) {
      const data = yield axios.get(
        `${process.env.REACT_APP_API_URL}payment-accounts?q=${payload}`,
        Auth.authConfig(),
      );
      yield put({
        type: types.GET_FILTERED_PAYMENT_ACCOUNTS_SUCCESS,
        payload: data,
      });
    } else {
      yield put({
        type: types.GET_FILTERED_PAYMENT_ACCOUNTS_SUCCESS,
        payload: [],
      });
    }
  } catch (e) {
    yield put({
      type: types.GET_FILTERED_PAYMENT_ACCOUNTS_FAILURE,
      payload: [],
    });
  }
}

function* watchGetPaymentAccountsMethod() {
  yield takeLatest(types.GET_PAYMENT_ACCOUNTS_REQUEST, getPaymentAccountsRequest);
}

function* watchGetFilteredPaymentAccountsMethod() {
  yield debounce(500, types.GET_FILTERED_PAYMENT_ACCOUNTS, getFilteredPaymentAccountsRequest);
}

export default function* rootSaga() {
  yield all([fork(watchGetPaymentAccountsMethod)]);
  yield all([fork(watchGetFilteredPaymentAccountsMethod)]);
}