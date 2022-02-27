import * as types from './types';

const initialState: any = {
  teamMembersData: null,
  in_process: false
};

export default function teamMembersReducer(
  state = initialState,
  action: { type: string; payload: any },
) {
  switch (action.type) {
    case types.GET_TEAM_MEMBERS_REQUEST:
      return {
        ...state,
        in_process: true,
      }

    case types.GET_TEAM_MEMBERS_SUCCESS:
      return {
        ...state,
        in_process: false,
        teamMembersData: action.payload,
      };

    case types.GET_TEAM_MEMBERS_FAILURE:
      return {
        ...state,
        in_process: false,
      };

    default:
      return state;
  }
}