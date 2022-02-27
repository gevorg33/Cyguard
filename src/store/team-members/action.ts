import * as types from './types';

export const getTeamMembers = (data: any) => ({
  type: types.GET_TEAM_MEMBERS_REQUEST,
  payload: data,
});