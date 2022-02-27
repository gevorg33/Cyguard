import * as types from './types';

const initialState: any = {
  paymentsData: {},
  filteredLeaders: {},
  paymentsForLeader: [],
  currentPayment: {},
  currentApproveId: '',
  currentDeclineId: '',
  totalCount: 0,
  in_process: false,
};

export default function paymentsReducer(
  state = initialState,
  action: { type: string; payload: any },
) {

  switch (action.type) {

    case types.GET_PAYMENTS_REQUEST:
    case types.GET_PAYMENTS_FOR_LEADER_REQUEST:
    case types.DECLINE_PAYMENT_REQUEST:
    case types.ADD_PENDING_PAYMENT:
    case types.GET_FILTERED_LEADERS:
    case types.APPROVE_PAYMENT_REQUEST:
    case types.NUDGE_PAYMENT_REQUEST:
    case types.DONE_PAYMENT_REQUEST:
      return {
        ...state,
        in_process: true,
      };

    case types.GET_PAYMENTS_REQUEST_SUCCESS:
      return {
        ...state,
        in_process: false,
        paymentsData: action.payload,
      };

    case types.GET_PAYMENTS_REQUEST_FAILURE:
    case types.GET_PAYMENTS_FOR_LEADER_FAILURE:
    case types.ADD_PENDING_PAYMENT_SUCCESS:
    case types.ADD_PENDING_PAYMENT_FAILURE:
    case types.GET_FILTERED_LEADERS_FAILURE:
    case types.NUDGE_PAYMENT_FAILURE:
    case types.NUDGE_PAYMENT_SUCCESS:
    case types.DONE_PAYMENT_FAILURE:
      return {
        ...state,
        in_process: false,
      };

    case types.APPROVE_PAYMENT_FAILURE:
    case types.DECLINE_PAYMENT_FAILURE: {
      return {
        ...state,
        currentApproveDeclineId: '',
        in_process: false,
      };
    }

    case types.DECLINE_PAYMENT_SUCCESS:
    case types.APPROVE_PAYMENT_SUCCESS:
      return {
        ...state,
        in_process: false,
        currentApproveId: '',
        currentDeclineId: '',
        paymentsForLeader: state.paymentsForLeader.filter((item: any) => item.id !== action.payload),
      };

    case types.SET_APPROVED_PAYMENT_ID:
      return {
        ...state,
        currentApproveId: action.payload,
      };

    case types.SET_DECLINED_PAYMENT_ID:
      return {
        ...state,
        currentDeclineId: action.payload,
      };

    case types.DONE_PAYMENT_SUCCESS:
      return {
        ...state,
        in_process: false,
        paymentsData: {
          totalCount: state.paymentsData.totalCount -= 1,
          payments: state.paymentsData.payments.filter((item: any) => item.id !== action.payload),
        },
      };

    case types.GET_FILTERED_LEADERS_SUCCESS:
      return {
        ...state,
        in_process: false,
        filteredLeaders: action.payload,
      };

    case types.GET_PAYMENTS_FOR_LEADER_SUCCESS:
      return {
        ...state,
        in_process: false,
        paymentsForLeader: action?.payload?.payments,
        totalCount: action?.payload?.totalCount,
      };

    case types.SET_CURRENT_PAYMENT_SUCCESS:
      return {
        ...state,
        currentPayment: action.payload,
      };

    default:
      return state;
  }
}