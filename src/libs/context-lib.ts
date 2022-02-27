import { useContext, createContext, Context } from 'react';

export const AppContext: Context<any> = createContext(null);

export function useAppContext() {
  return useContext(AppContext);
}
