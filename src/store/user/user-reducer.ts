import * as types from './types';

const initialState: any = {
  user: {},
  signUpData: {},
  in_process: false,
  status: false,
  extraError: null,
  sign_up_confirmed: false,
  userDataUpdateInProcess: false,
  companyDataUpdateInProcess: false,
};

export default function userReducer(
  state = initialState,
  action: { type: string; payload: any }
) {
  switch (action.type) {
    case types.GET_USER_REQUEST_SUCCESS:
    case types.USER_SET_DATA:
      return {
        ...state,
        user: action.payload,
      };
    case types.UPDATE_USER_DATA_REQUEST:
      return {
        ...state,
        userDataUpdateInProcess: true,
      };
    case types.UPDATE_USER_DATA_SUCCESS:
      return {
        ...state,
        userDataUpdateInProcess: false,
        user: {
          ...(state.user || {}),
          ...action.payload,
        }
      };
    case types.UPDATE_USER_DATA_FAILURE:
      return {
        ...state,
        userDataUpdateInProcess: false,
      };

    case types.UPDATE_USER_COMPANY_DATA_REQUEST:
      return {
        ...state,
        companyDataUpdateInProcess: true,
      };
    case types.UPDATE_USER_COMPANY_DATA_SUCCESS:
      return {
        ...state,
        companyDataUpdateInProcess: false,
        user: {
          ...(state.user || {}),
          ...action.payload,
        }
      };

    case types.CLEAR_SIGN_UP_DATA:
      return {
        ...state,
        signUpData: {}
      }

    case types.CLEAR_EXTRA_ERROR:
      return {
        ...state,
        extraError: null
      }

    case types.SET_SIGN_UP_DATA_STEP_1:
      return {
        ...state,
        in_process: true
      }

    case types.SET_SIGN_UP_DATA_STEP_1_FAILURE:
    case types.SET_SIGN_UP_DATA_STEP_2_FAILURE:
    case types.SET_SIGN_UP_DATA_STEP_3_FAILURE:
      return {
        ...state,
        in_process: false,
        extraError: action.payload
      }

    case types.SET_SIGN_UP_DATA_STEP_1_SUCCESS:
    case types.SET_SIGN_UP_DATA_STEP_2_SUCCESS:
      return {
        ...state,
        signUpData: { ...state.signUpData, ...action.payload },
        extraError: null,
        in_process: false,
      }

    case types.SET_SIGN_UP_DATA_STEP_3_SUCCESS:
      return {
        ...state,
        in_process: false
      }

    case types.UPDATE_USER_COMPANY_DATA_FAILURE:
      return {
        ...state,
        companyDataUpdateInProcess: false,
      };
    case types.SIGN_OUT:
      return initialState;
    case types.SIGN_UP_CONFIRMED_SUCCESS:
      return {
        ...state,
        sign_up_confirmed: true,
      };
    default:
      return state;
  }
}
