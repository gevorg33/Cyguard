import * as types from './types';

export const getUser = () => ({
  type: types.GET_USER_REQUEST,
});

export const updateUserData = (params: any) => ({
  type: types.UPDATE_USER_DATA_REQUEST,
  payload: params,
});

export const updateUserCompany = (params: any) => ({
  type: types.UPDATE_USER_COMPANY_DATA_REQUEST,
  payload: params,
});

export const setUserData = (data: any) => ({
  type: types.USER_SET_DATA,
  payload: data,
});

export const setSignUpDataStepOne = (data: any, next: () => void) => ({
  type: types.SET_SIGN_UP_DATA_STEP_1,
  payload: { data, next },
});

export const setSignUpDataStepTwo = (data: any, next: () => void) => ({
  type: types.SET_SIGN_UP_DATA_STEP_2,
  payload: { data, next },
});

export const setSignUpDataStepThree = (data: any) => ({
  type: types.SET_SIGN_UP_DATA_STEP_3,
  payload: data,
});

export const clearSignUpData = () => ({
  type: types.CLEAR_SIGN_UP_DATA,
});

export const clearExtraError = () => ({
  type: types.CLEAR_EXTRA_ERROR,
});

export const signUpConfirmed = (data: any) => ({
  type: types.SIGN_UP_CONFIRMED,
  payload: data
});

export const signOut = () => ({
  type: types.SIGN_OUT,
});
