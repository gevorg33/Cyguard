import { all, fork, put, takeLatest, debounce } from 'redux-saga/effects';
import * as types from './types';
import axios from 'axios';
import { message } from 'antd';
import Auth from '../../services/auth';


function* getPaymentsRequest({ payload }: any) {
  const { limit, page } = payload;
  try {
    const { data } = yield axios.get(
      `${process.env.REACT_APP_API_URL}payments?scope=pending&limit=${limit}&page=${page}`,
      Auth.authConfig(),
    );
    yield put({
      type: types.GET_PAYMENTS_REQUEST_SUCCESS,
      payload: data,
    });
  } catch (e) {
    yield put({
      type: types.GET_PAYMENTS_REQUEST_FAILURE,
      payload: e?.response?.data?.data,
    });
  }
}

function* setCurrentPayment({ payload }: any) {
  yield put({
    type: types.SET_CURRENT_PAYMENT_SUCCESS,
    payload: payload,
  });
}

function* getPaymentsForLeaderRequest({ payload }: any) {
  const { limit, page } = payload;
  try {
    const { data } = yield axios.get(
      `${process.env.REACT_APP_API_URL}payments/business-leader?paged=true&limit=${limit}&page=${page}`,
      Auth.authConfig(),
    );
    yield put({
      type: types.GET_PAYMENTS_FOR_LEADER_SUCCESS,
      payload: data,
    });
  } catch (e) {
    yield put({
      type: types.GET_PAYMENTS_FOR_LEADER_FAILURE,
      payload: e?.response?.data?.data,
    });
  }
}

function* declinePaymentRequest({ payload }: any) {
  const { currentDeclineId, code } = payload;
  try {
    yield axios.patch(
      `${process.env.REACT_APP_API_URL}payments/${currentDeclineId}/business-leader-decision`,
      {
        'gCode': code,
        'status': 'rejected',
      },
      Auth.authConfig(),
    );
    yield put({
      type: types.DECLINE_PAYMENT_SUCCESS,
      payload: currentDeclineId,
    });
    message.success('Successfully declined');
  } catch (e) {
    yield put({
      type: types.DECLINE_PAYMENT_FAILURE,
      payload: e?.response?.data?.data,
    });
  }
}

function* approvePaymentRequest({ payload }: any) {
  const { currentApproveId, code } = payload;
  try {
    yield axios.patch(
      `${process.env.REACT_APP_API_URL}payments/${currentApproveId}/business-leader-decision`,
      {
        'gCode': code,
        'status': 'approved',
      },
      Auth.authConfig(),
    );
    yield put({
      type: types.APPROVE_PAYMENT_SUCCESS,
      payload: currentApproveId,
    });
    message.success('Successfully approved');
  } catch (e) {
    yield put({
      type: types.APPROVE_PAYMENT_FAILURE,
      payload: e?.response?.data?.data,
    });
  }
}

function* donePaymentRequest({ payload }: any) {
  try {
    yield axios.post(
      `${process.env.REACT_APP_API_URL}payments/${payload}/done`,
      {},
      Auth.authConfig()
    );
    yield put({
      type: types.DONE_PAYMENT_SUCCESS,
      payload: payload,
    });
    message.success('Successfully Done!');
  } catch (e) {
    yield put({
      type: types.DONE_PAYMENT_FAILURE,
      payload: e?.response?.data?.data,
    });
  }
}

function* nudgePaymentRequest({ payload }: any) {
  try {
    yield axios.post(
      `${process.env.REACT_APP_API_URL}payments/${payload}/nudge`,
      {},
      Auth.authConfig(),
    );
    yield put({
      type: types.NUDGE_PAYMENT_SUCCESS,
      payload: payload,
    });
    message.success('Successfully Nudge!');
  } catch (e) {
    yield put({
      type: types.NUDGE_PAYMENT_FAILURE,
      payload: e?.response?.data?.data,
    });
  }
}

function* createPaymentRequest({ payload }: any) {
  try {
    yield axios.post(
      `${process.env.REACT_APP_API_URL}payments`,
      payload,
      {
        'headers': {
          'content-type': 'multipart/form-data',
          'Authorization': `Bearer ${Auth.getToken()}`,
        },
      },
    );
    yield put({
      type: types.ADD_PENDING_PAYMENT_SUCCESS,
    });
    message.success('Successfully created');
  } catch (e) {
    yield put({
      type: types.ADD_PENDING_PAYMENT_FAILURE,
      payload: e?.response?.data?.data,
    });
  }
}

function* getFilteredLeadersRequest({ payload }: any) {
  try {
    if (payload.trim()) {
      const data = yield axios.get(
        `${process.env.REACT_APP_API_URL}users/team-members/business-leaders?q=${payload}`,
        Auth.authConfig(),
      );
      yield put({
        type: types.GET_FILTERED_LEADERS_SUCCESS,
        payload: data,
      });
    } else {
      yield put({
        type: types.GET_FILTERED_LEADERS_SUCCESS,
        payload: [],
      });
    }
  } catch (e) {
    yield put({
      type: types.GET_FILTERED_LEADERS_FAILURE,
      payload: e?.response?.data?.data,
    });
  }
}

function* watchGetFilteredLeadersMethod() {
  yield debounce(500, types.GET_FILTERED_LEADERS, getFilteredLeadersRequest);
}

function* watchGetPaymentsMethod() {
  yield takeLatest(types.GET_PAYMENTS_REQUEST, getPaymentsRequest);
}

function* watchGetPaymentsForLeaderMethod() {
  yield takeLatest(types.GET_PAYMENTS_FOR_LEADER_REQUEST, getPaymentsForLeaderRequest);
}

function* watchDeclinePaymentMethod() {
  yield takeLatest(types.DECLINE_PAYMENT_REQUEST, declinePaymentRequest);
}

function* watchApprovePaymentMethod() {
  yield takeLatest(types.APPROVE_PAYMENT_REQUEST, approvePaymentRequest);
}

function* watchDonePaymentMethod() {
  yield takeLatest(types.DONE_PAYMENT_REQUEST, donePaymentRequest);
}

function* watchNudgePaymentMethod() {
  yield takeLatest(types.NUDGE_PAYMENT_REQUEST, nudgePaymentRequest);
}

function* watchCreatePaymentMethod() {
  yield takeLatest(types.ADD_PENDING_PAYMENT, createPaymentRequest);
}

function* watchSetCurrentPaymentMethod() {
  yield takeLatest(types.SET_CURRENT_PAYMENT, setCurrentPayment);
}

export default function* rootSaga() {
  yield all([fork(watchGetPaymentsMethod)]);
  yield all([fork(watchGetPaymentsForLeaderMethod)]);
  yield all([fork(watchDeclinePaymentMethod)]);
  yield all([fork(watchCreatePaymentMethod)]);
  yield all([fork(watchGetFilteredLeadersMethod)]);
  yield all([fork(watchApprovePaymentMethod)]);
  yield all([fork(watchSetCurrentPaymentMethod)]);
  yield all([fork(watchDonePaymentMethod)]);
  yield all([fork(watchNudgePaymentMethod)]);
}