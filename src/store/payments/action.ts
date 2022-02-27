import * as types from './types';

export const getPayments = (data: any) => ({
  type: types.GET_PAYMENTS_REQUEST,
  payload: data,
});

export const getPaymentsForLeader = (data: any) => ({
  type: types.GET_PAYMENTS_FOR_LEADER_REQUEST,
  payload: data,
});

export const declinePayment = (data: any) => ({
  type: types.DECLINE_PAYMENT_REQUEST,
  payload: data,
});

export const approvePayment = (data: any) => ({
  type: types.APPROVE_PAYMENT_REQUEST,
  payload: data,
});

export const setDeclinePaymentId = (data: any) => ({
  type: types.SET_DECLINED_PAYMENT_ID,
  payload: data,
});

export const setApprovePaymentId = (data: any) => ({
  type: types.SET_APPROVED_PAYMENT_ID,
  payload: data,
});

export const nudgePayment = (data: any) => ({
  type: types.NUDGE_PAYMENT_REQUEST,
  payload: data,
});

export const donePayment = (data: any) => ({
  type: types.DONE_PAYMENT_REQUEST,
  payload: data,
});

export const addPendingPayment = (data: any) => ({
  type: types.ADD_PENDING_PAYMENT,
  payload: data,
});

export const setCurrentPayment = (data: any) => ({
  type: types.SET_CURRENT_PAYMENT,
  payload: data,
});

export const getFilteredLeaders = (data: string) => ({
  type: types.GET_FILTERED_LEADERS,
  payload: data,
});