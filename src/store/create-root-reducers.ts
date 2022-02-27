import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import userReducer from 'store/user/user-reducer';
import paymentAccountsReducer from './payment-account/payment-accounts-reducer';
import paymentsReducer from './payments/payments-reducer';
import teamMembersReducer from './team-members/team-members-reducer';

const createRootReducers = (history: any) =>
  combineReducers({
    user: userReducer,
    paymentAccount: paymentAccountsReducer,
    payment: paymentsReducer,
    teamMembers: teamMembersReducer,
    router: connectRouter(history),
  });

export default createRootReducers;
