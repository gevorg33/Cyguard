import * as types from './types';

export const setPaymentAccountData = (data: any) => ({
  type: types.PAYMENT_ACCOUNT_SET_DATA,
  payload: data
});

export const removePaymentAccountData = () => ({
  type: types.PAYMENT_ACCOUNT_REMOVE_SET_DATA,
});

export const getPaymentAccount = (data: any) => ({
  type: types.GET_PAYMENT_ACCOUNTS_REQUEST,
  payload: data
});

export const getFilteredPaymentAccounts = (data:string) => ({
  type: types.GET_FILTERED_PAYMENT_ACCOUNTS,
  payload: data
})