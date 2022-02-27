import * as types from './types';

const initialState: any = {
  paymentAccount: {},
  paymentAccountData: {},
  filteredPaymentAccounts: {},
  in_process: false,
};

export default function paymentAccountsReducer(
  state = initialState,
  action: { type: string; payload: any },
) {
  switch (action.type) {
    case types.PAYMENT_ACCOUNT_SET_DATA :
      return {
        ...state,
        paymentAccount: { ...state.paymentAccount, ...action.payload },
      };

    case types.PAYMENT_ACCOUNT_REMOVE_SET_DATA :
      return {
        ...state,
        paymentAccount: {},
      };

    case types.GET_PAYMENT_ACCOUNTS_REQUEST:
    case types.GET_FILTERED_PAYMENT_ACCOUNTS:
      return {
        ...state,
        in_process: true,
      };

    case types.GET_PAYMENT_ACCOUNTS_REQUEST_SUCCESS:
      return {
        ...state,
        in_process: false,
        paymentAccountData: action.payload,
      };

    case types.GET_FILTERED_PAYMENT_ACCOUNTS_SUCCESS:
      return {
        ...state,
        in_process: false,
        filteredPaymentAccounts: action.payload,
      };

    case types.GET_PAYMENT_ACCOUNTS_REQUEST_FAILURE:
    case types.GET_FILTERED_PAYMENT_ACCOUNTS_FAILURE:
      return {
        ...state,
        in_process: false,
      };

    default:
      return state;
  }
}