import { RootStateOrAny } from 'react-redux';

export const userSelector = (state: RootStateOrAny) => state.user;
export const userDataUpdateInProcessSelector = (state: RootStateOrAny) => state.userDataUpdateInProcess;
export const companyDataUpdateInProcessSelector = (state: RootStateOrAny) => state.companyDataUpdateInProcess;
