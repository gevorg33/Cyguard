import { all } from 'redux-saga/effects';
import userSaga from 'store/user/root-saga';
import paymentAccountSaga from 'store/payment-account/root-saga';
import paymentsSaga from 'store/payments/root-saga';
import teamMembersSaga from 'store/team-members/root-saga';

export default function* rootSaga() {
  yield all([
    userSaga(),
    paymentAccountSaga(),
    paymentsSaga(),
    teamMembersSaga(),
  ]);
}
